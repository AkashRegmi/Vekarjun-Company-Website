import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { submitInquiry } from '../controllers/contactController.js';

const router = Router();
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many inquiries were submitted. Please try again later.' },
});

router.post('/', inquiryLimiter, submitInquiry);

export default router;
