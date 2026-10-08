import mongoose from 'mongoose';
import Inquiry, { leadStatuses } from '../models/Inquiry.js';

const fields = ['name', 'company', 'email', 'phone', 'service', 'budget', 'details'];
const limits = { name: 120, company: 120, email: 254, phone: 40, service: 120, budget: 80, details: 5000 };

export function validateInquiry(body) {
  const inquiry = {};
  for (const field of fields) {
    if (body[field] !== undefined && typeof body[field] !== 'string') {
      return { error: `${field} must be text.` };
    }
    inquiry[field] = (body[field] || '').trim();
  }

  if (!inquiry.name) return { error: 'Name is required.' };
  if (!inquiry.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return { error: 'Enter a valid email address.' };
  }
  if (!inquiry.service) return { error: 'Select a service.' };
  if (!inquiry.details) return { error: 'Project details are required.' };

  for (const [field, maxLength] of Object.entries(limits)) {
    if (inquiry[field].length > maxLength) {
      return { error: `${field} must be ${maxLength} characters or fewer.` };
    }
  }

  return { inquiry };
}

export async function createInquiry(data) {
  return Inquiry.create(data);
}

export async function findInquiries({ page, limit, query }) {
  const filter = query
    ? { $or: fields.map((field) => ({
      [field]: { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' },
    })) }
    : {};

  const [documents, total, totalAll, statusGroups] = await Promise.all([
    Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Inquiry.countDocuments(filter),
    Inquiry.countDocuments(),
    Inquiry.aggregate([
      { $group: { _id: { $ifNull: ['$status', leadStatuses[0]] }, count: { $sum: 1 } } },
    ]),
  ]);

  const inquiries = documents.map((inquiry) => ({ ...inquiry, status: inquiry.status || leadStatuses[0] }));
  const statusCounts = Object.fromEntries(leadStatuses.map((status) => [status, 0]));
  for (const group of statusGroups) {
    if (Object.hasOwn(statusCounts, group._id)) statusCounts[group._id] = group.count;
  }

  return { inquiries, total, totalAll, statusCounts };
}

export async function updateInquiryStatus(id, status) {
  if (!mongoose.isValidObjectId(id)) return { error: 'Invalid inquiry ID.', statusCode: 400 };
  if (!leadStatuses.includes(status)) return { error: 'Invalid inquiry status.', statusCode: 400 };

  const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }).lean();
  if (!inquiry) return { error: 'Inquiry not found.', statusCode: 404 };
  return { inquiry: { ...inquiry, status: inquiry.status || leadStatuses[0] } };
}

export async function deleteInquiry(id) {
  if (!mongoose.isValidObjectId(id)) return { error: 'Invalid inquiry ID.', statusCode: 400 };

  const inquiry = await Inquiry.findByIdAndDelete(id);
  if (!inquiry) return { error: 'Inquiry not found.', statusCode: 404 };
  return { id: inquiry.id };
}
