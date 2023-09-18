import { Router } from 'express';
import { search } from '../controllers/search.ts';

const router = Router();

router.get('/:query', search);

export default router;
