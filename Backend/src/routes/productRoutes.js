import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from '../controllers/productController.js';

const router = express.Router();
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const upload = multer({
  dest: path.resolve(currentDir, '../../uploads/products'),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
      return;
    }
    callback(new Error('Only image files are allowed'));
  },
});

router.get('/', listProducts);
router.get('/:id', getProductById);
router.post('/', upload.array('images', 8), createProduct);
router.put('/:id', upload.array('images', 8), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
