import express from 'express';
import upload from '../middleware/cloudinaryStorage.js';
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', listCustomers);
router.get('/:id', getCustomer);
router.post('/createuser', createCustomer);
router.put('/:id', upload.single('avatar'), updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
