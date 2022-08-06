import { Router } from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';
import verifySignin from '../middlewares/verifySignin.js';
import verifySignup from '../middlewares/verifySignup.js';

const router = Router();

router.post('/signup', verifySignup, signUp);
router.post('/signin', verifySignin, signIn);

export default router;
