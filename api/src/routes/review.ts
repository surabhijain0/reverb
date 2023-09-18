import { getReview, postReview } from '../controllers/review.ts';
import { Router } from 'express';

const router = Router();

router.get('/:album/:user', getReview);
router.post('/', postReview);

export default router;
