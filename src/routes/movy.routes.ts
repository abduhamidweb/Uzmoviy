import express from 'express';
import movieController from '../controllers/movy.contr.js';

const router = express.Router();

router.post('/', movieController.createMovie.bind(movieController));
router.get('/', movieController.getMovies.bind(movieController));
router.get('/:id', movieController.getMovie.bind(movieController));
router.put('/:id', movieController.updateMovie.bind(movieController));
router.delete('/:id', movieController.deleteMovie.bind(movieController));

export default router;
