import { getFollow, postFollow, postUnfollow } from '../controllers/follow.ts';
import { Router } from 'express';

const router = Router();

router.get('/:id/:userID', getFollow);
router.post('/follow', postFollow);
router.post('/unfollow', postUnfollow);

export default router;
