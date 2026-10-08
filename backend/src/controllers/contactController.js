import { createInquiry, validateInquiry } from '../services/inquiryService.js';

export async function submitInquiry(request, response) {
  const result = validateInquiry(request.body || {});
  if (result.error) return response.status(400).json({ error: result.error });

  const inquiry = await createInquiry(result.inquiry);
  return response.status(201).json({ message: 'Inquiry received.', id: inquiry.id });
}
