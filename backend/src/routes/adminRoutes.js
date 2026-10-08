import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { changeInquiryStatus, getSession, listInquiries, login, logout, removeInquiry } from '../controllers/adminController.js';
import { createContent, getAdminContent, removeContent, updateContent, updateContentStatus } from '../controllers/siteContentController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many sign-in attempts. Please try again later.' },
});

router.post('/login', loginLimiter, login);
router.post('/logout', logout);
router.get('/session', requireAdmin, getSession);
router.get('/content', requireAdmin, getAdminContent);
router.post('/content', requireAdmin, createContent);
router.patch('/content/:id/status', requireAdmin, updateContentStatus);
router.patch('/content/:id', requireAdmin, updateContent);
router.delete('/content/:id', requireAdmin, removeContent);
router.get('/inquiries', requireAdmin, listInquiries);
router.patch('/inquiries/:id/status', requireAdmin, changeInquiryStatus);
router.delete('/inquiries/:id', requireAdmin, removeInquiry);

export default router;
