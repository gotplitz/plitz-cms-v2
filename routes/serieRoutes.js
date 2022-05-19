import express from 'express';
import {
	editSerie,
	getSerieBySlug,
	getSeries,
	postSerie,
	removeSerie,
} from '../controllers/serieController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSeries);
router.route('/:fmlink').get(getSerieBySlug);
router.route('/').post(protect, postSerie);
router.route('/').put(protect, editSerie);
router.route('/:id').delete(protect, removeSerie);

export default router;
