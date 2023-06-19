import express from 'express';
import ContactController from '../controllers/contact.contr.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/', ContactController.createContact);
router.get('/', authMiddleware, ContactController.getContacts);
router.get('/:id', authMiddleware, ContactController.getContactById);
router.put('/:id', authMiddleware, ContactController.updateContact);
router.delete('/:id', authMiddleware, ContactController.deleteContact);

export default router;
