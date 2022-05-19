import express from 'express';
import {
	getBlogposts,
	getBlogpostBySlug,
	postBlogpost,
	editBlogpost,
	removeBlogpost,
} from '../controllers/blogpostController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getBlogposts);
router.route('/:fmlink').get(getBlogpostBySlug);
router.route('/').post(protect, postBlogpost);
router.route('/').put(protect, editBlogpost);
router.route('/:id').delete(protect, removeBlogpost);

export default router;
