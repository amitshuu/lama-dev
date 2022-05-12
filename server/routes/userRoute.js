import express from 'express';
import {
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  getStats,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/auth.js';

const router = express.Router();

router.route('/profile').put(protect, updateUser);
router.route('/:id').delete(protect, deleteUser);
router.route('/find/:id').get(protect, admin, getUser);
router.route('/').get(protect, admin, getAllUsers);
router.route('/stats').get(protect, admin, getStats);

export default router;
