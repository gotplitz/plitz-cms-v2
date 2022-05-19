import express from 'express';
import {
	getPages,
	getPageBySlug,
	postPage,
	editPage,
	removePage,
} from '../controllers/pageController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPages);
router.route('/:fmlink').get(getPageBySlug);
router.route('/').post(protect, postPage);
router.route('/').put(protect, editPage);
router.route('/:id').delete(protect, removePage);

export default router;
