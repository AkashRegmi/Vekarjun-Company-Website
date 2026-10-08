import mongoose from 'mongoose';

export const LeadStatus = Object.freeze({
  NEW: 'NEW',
  CONTACTED: 'CONTACTED',
  QUALIFIED: 'QUALIFIED',
  IN_PROGRESS: 'IN_PROGRESS',
  NURTURING: 'NURTURING',
  CONVERTED: 'CONVERTED',
  LOST: 'LOST',
  UNQUALIFIED: 'UNQUALIFIED',
});
export const leadStatuses = Object.values(LeadStatus);

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  company: { type: String, trim: true, maxlength: 120, default: '' },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 40, default: '' },
  service: { type: String, required: true, trim: true, maxlength: 120 },
  budget: { type: String, trim: true, maxlength: 80, default: '' },
  details: { type: String, required: true, trim: true, maxlength: 5000 },
  status: { type: String, enum: leadStatuses, default: LeadStatus.NEW, required: true },
}, { timestamps: true });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
