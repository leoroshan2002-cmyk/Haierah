import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from '../controllers/categoryController.js';

const router = express.Router();
const currentFile = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFile);
const categoryUploadDir = path.resolve(currentDir, '../../uploads/categories');
fs.mkdirSync(categoryUploadDir, { recursive: true });

const upload = multer({
  dest: categoryUploadDir,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith('image/')) {
      callback(null, true);
      return;
    }
    callback(new Error('Only image files are allowed'));
  },
});

router.get('/', listCategories);
router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
