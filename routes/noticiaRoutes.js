import express from 'express';
import {
	getNoticias,
	getNoticiaBySlug,
	postNoticia,
	editNoticia,
	removeNoticia,
} from '../controllers/noticiaController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getNoticias);
router.route('/:fmlink').get(getNoticiaBySlug);
router.route('/').post(protect, postNoticia);
router.route('/').put(protect, editNoticia);
router.route('/:id').delete(protect, removeNoticia);

export default router;
