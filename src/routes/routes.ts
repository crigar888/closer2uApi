import express, { Request, Response, Router } from 'express';
import OpenaiController from '../features/openai/OpenaiController';
import TwilioController from '../features/twilio/TwilioController';

const router = Router();

router.use('/openai', OpenaiController);
router.use('/whatsapp', TwilioController);

export default router;
