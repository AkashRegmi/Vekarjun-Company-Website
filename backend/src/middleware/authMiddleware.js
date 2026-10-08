import { findSessionAdmin } from '../services/authService.js';

export async function requireAdmin(request, response, next) {
  const admin = await findSessionAdmin(request);
  if (!admin) {
    return response.status(401).json({ error: 'Sign in to access inquiries.' });
  }
  request.admin = admin;
  return next();
}
