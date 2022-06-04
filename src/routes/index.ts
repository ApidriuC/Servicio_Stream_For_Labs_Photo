import { Router } from 'express';
import PhotoRouter from './photo.route';

const router = Router();
const prefix: string = '/api';

router.use(`${prefix}/photo`, PhotoRouter);

export default router;
