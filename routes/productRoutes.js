import express from 'express';
import {
	editProduct,
	getPrevsProducts,
	getProductImage,
	getProducts,
	getProductsInCategory,
	getSingleProduct,
	postProduct,
	removeProduct,
	getProductsInSer,
	getFilteredProds,
} from '../controllers/productController.js';

// Middleware
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/previews').get(getPrevsProducts);
router.route('/image/:id').get(getProductImage);
router.route('/').get(getProducts);
router.route('/:catid').get(getProductsInCategory);
router.route('/ser').post(getProductsInSer);
router.route('/filter').post(getFilteredProds);
router.route('/single/:fmlink').get(getSingleProduct);
router.route('/').post(protect, postProduct);
router.route('/').put(protect, editProduct);
router.route('/:id').delete(protect, removeProduct);

export default router;
