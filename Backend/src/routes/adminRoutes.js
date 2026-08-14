import express from 'express';
import { getAdminDashboard } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import userRoutes from './userRoutes.js';
import couponRoutes from './couponRoutes.js';
import campaignRoutes from './campaignRoutes.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.get('/dashboard', getAdminDashboard);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/categories', categoryRoutes);
router.use('/customers', userRoutes);
router.use('/coupons', couponRoutes);
router.use('/campaigns', campaignRoutes);

export default router;
