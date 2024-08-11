import express from 'express';
import { smartSchedule } from '../controllers/utilsController';

const router = express.Router();

router.get('/smart-schedule', smartSchedule);

export default router;
