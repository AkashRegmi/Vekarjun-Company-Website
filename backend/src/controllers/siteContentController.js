import {
  createSiteContent,
  deleteSiteContent,
  listAdminContent,
  listPublicContent,
  updateSiteContent,
  updateSiteContentStatus,
} from '../services/siteContentService.js';

export async function getPublicStories(_request, response) {
  return response.json({ items: await listPublicContent('story') });
}

export async function getPublicProjects(_request, response) {
  return response.json({ items: await listPublicContent('project') });
}

export async function getAdminContent(_request, response) {
  const items = await listAdminContent();
  const stats = items.reduce((counts, item) => {
    counts.total += 1;
    counts[item.status === 'PENDING' ? 'pending' : 'published'] += 1;
    return counts;
  }, { total: 0, published: 0, pending: 0 });
  return response.json({ items, stats });
}

export async function createContent(request, response) {
  const result = await createSiteContent(request.body?.type, request.body || {});
  if (result.error) return response.status(result.statusCode || 400).json({ error: result.error });
  return response.status(201).json({ item: result.content });
}

export async function updateContent(request, response) {
  const result = await updateSiteContent(request.params.id, request.body || {});
  if (result.error) return response.status(result.statusCode).json({ error: result.error });
  return response.json({ item: result.content });
}

export async function updateContentStatus(request, response) {
  const result = await updateSiteContentStatus(request.params.id, request.body?.status);
  if (result.error) return response.status(result.statusCode).json({ error: result.error });
  return response.json({ item: result.content });
}

export async function removeContent(request, response) {
  const result = await deleteSiteContent(request.params.id);
  if (result.error) return response.status(result.statusCode).json({ error: result.error });
  return response.json({ message: 'Content item deleted.', id: result.id });
}
