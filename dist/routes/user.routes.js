import express from 'express';
import actorController from '../controllers/user.contr.js';
const router = express.Router();
router.post('/', actorController.createActor.bind(actorController));
router.get('/', actorController.getActors.bind(actorController));
router.get('/:id', actorController.getActor.bind(actorController));
router.put('/:id', actorController.updateActor.bind(actorController));
router.delete('/:id', actorController.deleteActor.bind(actorController));
export default router;
