import { expiredSessionCookie, createSessionToken, sessionCookie, verifyAdminCredentials } from '../services/authService.js';
import { deleteInquiry, findInquiries, updateInquiryStatus } from '../services/inquiryService.js';

export async function login(request, response) {
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  const admin = await verifyAdminCredentials(email, password);
  if (!admin) {
    return response.status(401).json({ error: 'Invalid email or password.' });
  }

  response.setHeader('Set-Cookie', sessionCookie(createSessionToken(admin.email)));
  return response.json({ message: 'Signed in.' });
}

export function logout(_request, response) {
  response.setHeader('Set-Cookie', expiredSessionCookie());
  return response.json({ message: 'Signed out.' });
}

export function getSession(request, response) {
  return response.json({ admin: { email: request.admin.email } });
}

export async function listInquiries(request, response) {
  const page = Math.max(1, Number.parseInt(request.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(request.query.limit, 10) || 50));
  const query = typeof request.query.q === 'string' ? request.query.q.trim().slice(0, 120) : '';
  const { inquiries, total, totalAll, statusCounts } = await findInquiries({ page, limit, query });

  return response.json({
    inquiries,
    page,
    pages: Math.ceil(total / limit),
    total,
    totalAll,
    statusCounts,
  });
}

export async function changeInquiryStatus(request, response) {
  const result = await updateInquiryStatus(request.params.id, request.body?.status);
  if (result.error) return response.status(result.statusCode).json({ error: result.error });
  return response.json({ inquiry: result.inquiry });
}

export async function removeInquiry(request, response) {
  const result = await deleteInquiry(request.params.id);
  if (result.error) return response.status(result.statusCode).json({ error: result.error });
  return response.json({ message: 'Inquiry deleted.', id: result.id });
}
