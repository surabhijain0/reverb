import { album, artist, user } from '../controllers/item.ts';
import { Router } from 'express';

const router = Router();

router.get('/album/:id', album);
router.get('/artist/:id', artist);
router.get('/user/:id', user);

export default router;
