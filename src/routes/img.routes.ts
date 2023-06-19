import express from 'express';
import ImgController from '../controllers/img.contr.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, ImgController.createImg);
router.get('/', ImgController.getAllImg);
router.get('/:id', ImgController.getImg);
router.put('/:id', authMiddleware, ImgController.updateImg);
router.delete('/:id', authMiddleware, ImgController.deleteImg);

export default router;
