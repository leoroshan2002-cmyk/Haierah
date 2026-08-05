import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  listCustomers,
  updateCustomer,
} from '../controllers/userController.js';

const router = express.Router();
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const userUploadDir = path.resolve(currentDir, '../../uploads/users');
fs.mkdirSync(userUploadDir, { recursive: true });

const upload = multer({
  dest: userUploadDir,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
      return;
    }
    callback(new Error('Only image files are allowed'));
  },
});

router.get('/', listCustomers);
router.get('/:id', getCustomer);
router.post('/', createCustomer);
router.put('/:id', upload.single('avatar'), updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
