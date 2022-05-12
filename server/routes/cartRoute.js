import express from 'express';
import {
  createCart,
  deleteCart,
  getAllCarts,
  getUserCart,
  updateCart,
} from '../controllers/cartController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/').post(protect, createCart).get(protect, getAllCarts);
router.route('/:id').delete(protect, deleteCart).put(protect, updateCart);
router.route('/find/:userId').get(protect, getUserCart);

export default router;
