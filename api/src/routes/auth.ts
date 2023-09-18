import { auth } from '../controllers/auth.ts';
import { Router } from 'express';

const router = Router();

router.get('/', auth);

export default router;
