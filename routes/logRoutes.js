import express from 'express';
import { createLog, getLogs } from '../controllers/logController.js';

const router = express.Router();

router.route('/').get(getLogs);
router.route('/').post(createLog);

export default router;
