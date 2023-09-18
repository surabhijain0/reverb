import { dashboard } from '../controllers/dashboard.ts';
import { Router } from 'express';

const router = Router();

router.get('/:id', dashboard);

export default router;
