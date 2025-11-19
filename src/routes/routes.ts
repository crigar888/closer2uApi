import { Router } from 'express';
import OpenaiController from '../features/openai/OpenaiController';
import TwilioController from '../features/twilio/TwilioController';
import WebhookController from '../features/webhooks/WebhookController';


const router = Router();

router.use('/openai', OpenaiController);
router.use('/whatsapp', TwilioController);
router.use('/webhook', WebhookController);
router.use('/test', WebhookController);
router.use('/build', WebhookController);

export default router;
