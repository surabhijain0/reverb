import { login } from '../controllers/login.ts';
import { Router } from 'express';

const router = Router();

router.get('/', login);

export default router;
