import { Router } from 'express';
import getUserUrls from '../controllers/usersControllers.js';
import verifyJwt from '../middlewares/verifyJwt.js';

const router = Router();

router.get('/users/me', verifyJwt, getUserUrls);

export default router;