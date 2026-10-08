import crypto from 'node:crypto';
import { promisify } from 'node:util';
import Admin from '../models/Admin.js';

const sessionCookieName = 'vek_admin_session';
const sessionDurationSeconds = 60 * 60 * 8;
const scrypt = promisify(crypto.scrypt);

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export async function verifyAdminCredentials(email, password) {
  const admin = await Admin.findOne({ email }).select('+passwordHash');
  if (!admin) return null;

  const [algorithm, salt, storedHash] = admin.passwordHash.split('$');
  if (algorithm !== 'scrypt' || !salt || !/^[a-f\d]{128}$/i.test(storedHash || '')) return null;

  const expectedHash = Buffer.from(storedHash, 'hex');
  const suppliedHash = await scrypt(password, salt, expectedHash.length);
  if (expectedHash.length !== suppliedHash.length || !crypto.timingSafeEqual(expectedHash, suppliedHash)) {
    return null;
  }
  return admin;
}

export function createSessionToken(email) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: email,
    exp: Math.floor(Date.now() / 1000) + sessionDurationSeconds,
  })).toString('base64url');
  const body = `${header}.${payload}`;
  const signature = crypto.createHmac('sha256', process.env.JWT_SECRET).update(body).digest('base64url');
  return `${body}.${signature}`;
}

function getCookie(request) {
  const cookie = request.headers.cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookieName}=`));
  return cookie?.slice(sessionCookieName.length + 1);
}

export function hasValidSession(request) {
  const token = getCookie(request);
  if (!token) return false;

  const [header, payload, signature, extra] = token.split('.');
  if (!header || !payload || !signature || extra) return false;
  const body = `${header}.${payload}`;
  const expected = crypto.createHmac('sha256', process.env.JWT_SECRET).update(body).digest('base64url');
  if (!safeEqual(signature, expected)) return false;

  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return typeof claims.sub === 'string'
      && claims.sub.length > 0
      && Number.isInteger(claims.exp)
      && claims.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export async function findSessionAdmin(request) {
  if (!hasValidSession(request)) return null;
  const token = getCookie(request);
  const [, payload] = token.split('.');
  const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
  return Admin.findOne({ email: claims.sub }).select('_id email').lean();
}

export function sessionCookie(token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${sessionCookieName}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${sessionDurationSeconds}${secure}`;
}

export function expiredSessionCookie() {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${sessionCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`;
}
