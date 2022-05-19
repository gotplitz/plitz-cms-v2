import express from 'express';
import {
  authUser,
  changePassword,
  forgotPassword,
  getUserProfile,
  registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/forgot').post(forgotPassword);
router.route('/change').put(protect, changePassword);

export default router;
