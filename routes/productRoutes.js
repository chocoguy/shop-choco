import express from 'express';
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productController.js';

// /api/products
router.route('/').get(getProducts)

// /api/products/783
router.route('/:id').get(getProductById)

export default router