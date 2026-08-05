import express from 'express';
import {
  cancelOrder,
  createOrder,
  deleteOrder,
  getOrderById,
  getOrdersByUser,
  listOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', listOrders);
router.get('/:id', getOrderById);
router.get('/user/:userId', getOrdersByUser);
router.post('/', createOrder);
router.put('/:id', updateOrderStatus);
router.put('/:id/status', updateOrderStatus);
router.patch('/:id/status', updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);
router.delete('/:id', deleteOrder);

export default router;
