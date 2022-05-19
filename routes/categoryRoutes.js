import express from 'express';
import {
	editCategory,
	getCategories,
	getCategoryBySlug,
	postCategory,
	removeCategory,
} from '../controllers/categoryController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getCategories);
router.route('/:fmlink').get(getCategoryBySlug);
router.route('/').post(protect, postCategory);
router.route('/').put(protect, editCategory);
router.route('/:id').delete(protect, removeCategory);

export default router;
