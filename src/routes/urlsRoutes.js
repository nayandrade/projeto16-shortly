import { Router } from 'express';
import { postShortenUrl, getShortenUrlById, getOpenShortenUrl, deleteShortenUrl } from '../controllers/urlsControllers.js';
import verifyJwt from '../middlewares/verifyJwt.js';

const router = Router();

router.post('/urls/shorten', verifyJwt, postShortenUrl);
router.get('/urls/:id', getShortenUrlById);
router.get('/open/:shortUrl', getOpenShortenUrl);
router.delete('/urls/:id', verifyJwt, deleteShortenUrl);

export default router;