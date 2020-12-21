import express from 'express';
const router = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// /api/users/login
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById) //ids at bottom

export default router