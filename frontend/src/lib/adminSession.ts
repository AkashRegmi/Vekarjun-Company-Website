import { parseApiResponse } from './api';

export const adminSessionQueryKey = ['admin', 'session'] as const;

export type AdminSession = {
  admin: { email: string };
};

export async function fetchAdminSession(): Promise<AdminSession | null> {
  const response = await fetch('/api/admin/session', { credentials: 'include' });
  if (response.status === 401) return null;
  return parseApiResponse<AdminSession>(response);
}
