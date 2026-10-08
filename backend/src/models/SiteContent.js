import mongoose from 'mongoose';

export const SITE_CONTENT_STATUSES = ['PUBLISHED', 'PENDING'];

const siteContentSchema = new mongoose.Schema({
  type: { type: String, enum: ['story', 'project'], required: true, index: true },
  status: { type: String, enum: SITE_CONTENT_STATUSES, default: 'PENDING', index: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  company: { type: String, trim: true, maxlength: 120, default: '' },
  role: { type: String, trim: true, maxlength: 120, default: '' },
  quote: { type: String, trim: true, maxlength: 3000, default: '' },
  industry: { type: String, trim: true, maxlength: 120, default: '' },
  problem: { type: String, trim: true, maxlength: 2000, default: '' },
  solution: { type: String, trim: true, maxlength: 2000, default: '' },
  technologies: { type: [String], default: [] },
  result: { type: String, trim: true, maxlength: 500, default: '' },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

siteContentSchema.index({ type: 1, name: 1 }, { unique: true });

const SiteContent = mongoose.model('SiteContent', siteContentSchema);

export default SiteContent;
