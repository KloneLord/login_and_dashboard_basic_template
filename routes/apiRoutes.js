// routes/apiRoutes.js

import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authController from '../controllers/authController.js';
import userController from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);

// Secured routes
router.get('/auth/profile', authMiddleware, authController.getUserProfile);
router.get('/users', authMiddleware, userController.getAllUsers);

export default router;
