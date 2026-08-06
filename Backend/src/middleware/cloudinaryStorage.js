import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'haierah/categories',
    format: async (_req, file) => file.mimetype?.split('/')[1] || 'jpg',
    public_id: (req, file) => {
      const originalName = file.originalname.replace(/\.[^.]+$/, '');
      const safeName = originalName.replace(/[^a-zA-Z0-9_-]/g, '_');
      return `${Date.now()}_${safeName}`;
    },
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      callback(null, true);
      return;
    }
    callback(new Error('Only image files are allowed'));
  },
});

export default upload;