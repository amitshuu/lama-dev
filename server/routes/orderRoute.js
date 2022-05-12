import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getIncomes,
  getUserOrder,
  updateOrder,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/auth.js';
const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router
  .route('/:id')
  .delete(protect, admin, deleteOrder)
  .put(protect, admin, updateOrder);
router.route('/find/:userId').get(protect, admin, getUserOrder);
router.route('/income').get(protect, admin, getIncomes);
export default router;
