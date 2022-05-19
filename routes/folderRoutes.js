import express from 'express';
import {
	getFolders,
	getFolderBySlug,
	postFolder,
	editFolder,
	removeFolder,
} from '../controllers/folderController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getFolders);
router.route('/:fmlink').get(getFolderBySlug);
router.route('/').post(protect, postFolder);
router.route('/').put(protect, editFolder);
router.route('/:id').delete(protect, removeFolder);

export default router;
