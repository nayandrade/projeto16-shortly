import { Router } from 'express';
import getRanking from '../controllers/rankControllers.js';

const router = Router();

router.get('/ranking', getRanking);

export default router;
