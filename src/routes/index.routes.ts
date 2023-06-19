import { Router } from 'express';
import moviesRoutes from "../routes/movy.routes.js";
import actorsRoutes from "../routes/user.routes.js";
const router = Router();
router.use('/actors', actorsRoutes);
router.use('/movies', moviesRoutes);
export default router; 