import express from 'express';
import {
  addProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(protect, admin, addProduct).get(getProducts);
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)
  .get(getSingleProduct);

export default router;
