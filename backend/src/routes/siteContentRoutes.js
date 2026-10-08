import { Router } from 'express';
import { getPublicProjects, getPublicStories } from '../controllers/siteContentController.js';

const router = Router();

router.get('/stories', getPublicStories);
router.get('/projects', getPublicProjects);

export default router;
