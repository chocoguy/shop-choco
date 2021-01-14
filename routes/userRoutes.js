import express from 'express';
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

// /api/users/login
router.route('/').post(registerUser).get(protect, isAdmin, getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)


export default router