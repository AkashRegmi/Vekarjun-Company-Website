import mongoose from 'mongoose';
import SiteContent, { SITE_CONTENT_STATUSES } from '../models/SiteContent.js';

const textFields = {
  story: ['name', 'role', 'company', 'quote'],
  project: ['name', 'industry', 'problem', 'solution', 'result'],
};

const limits = {
  name: 120,
  company: 120,
  role: 120,
  quote: 3000,
  industry: 120,
  problem: 2000,
  solution: 2000,
  result: 500,
};

function validateContent(type, body) {
  if (!Object.hasOwn(textFields, type)) return { error: 'Content type must be story or project.' };
  const content = { type };

  for (const field of textFields[type]) {
    if (typeof body[field] !== 'string') return { error: `${field} must be text.` };
    content[field] = body[field].trim();
    if (!content[field]) return { error: `${field} is required.` };
    if (content[field].length > limits[field]) return { error: `${field} must be ${limits[field]} characters or fewer.` };
  }

  if (type === 'project') {
    if (!Array.isArray(body.technologies) || body.technologies.length > 20
      || body.technologies.some((technology) => typeof technology !== 'string' || technology.trim().length > 60)) {
      return { error: 'Technologies must be a list of up to 20 text items, each 60 characters or fewer.' };
    }
    content.technologies = body.technologies.map((technology) => technology.trim()).filter(Boolean);
  }

  return { content };
}

export async function listPublicContent(type) {
  return SiteContent.find({ type, status: { $ne: 'PENDING' } }).sort({ sortOrder: 1, createdAt: 1 }).lean();
}

export async function listAdminContent() {
  const items = await SiteContent.find({}).sort({ type: 1, sortOrder: 1, createdAt: 1 }).lean();
  return items.map((item) => ({ ...item, status: item.status || 'PUBLISHED' }));
}

export async function createSiteContent(type, body) {
  const result = validateContent(type, body);
  if (result.error) return result;

  try {
    return { content: await SiteContent.create(result.content) };
  } catch (error) {
    if (error?.code === 11000) return { error: 'An item with this name already exists in this section.', statusCode: 409 };
    throw error;
  }
}

export async function updateSiteContent(id, body) {
  if (!mongoose.isValidObjectId(id)) return { error: 'Invalid content ID.', statusCode: 400 };
  const existing = await SiteContent.findById(id).lean();
  if (!existing) return { error: 'Content item not found.', statusCode: 404 };

  const result = validateContent(existing.type, body);
  if (result.error) return result;

  try {
    const content = await SiteContent.findByIdAndUpdate(
      id,
      { $set: result.content },
      { new: true, runValidators: true },
    ).lean();
    return { content };
  } catch (error) {
    if (error?.code === 11000) return { error: 'An item with this name already exists in this section.', statusCode: 409 };
    throw error;
  }
}

export async function updateSiteContentStatus(id, status) {
  if (!SITE_CONTENT_STATUSES.includes(status)) {
    return { error: 'Status must be PUBLISHED or PENDING.', statusCode: 400 };
  }
  if (!mongoose.isValidObjectId(id)) return { error: 'Invalid content ID.', statusCode: 400 };

  const content = await SiteContent.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true },
  ).lean();
  if (!content) return { error: 'Content item not found.', statusCode: 404 };
  return { content };
}

export async function deleteSiteContent(id) {
  if (!mongoose.isValidObjectId(id)) return { error: 'Invalid content ID.', statusCode: 400 };
  const content = await SiteContent.findByIdAndDelete(id);
  if (!content) return { error: 'Content item not found.', statusCode: 404 };
  return { id: content.id };
}
