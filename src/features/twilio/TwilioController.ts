import { Request, Response, Router } from 'express';
import TwilioService from './TwilioService';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/outgoing", async (req: Request, res: Response) => {
    const userMessage = req.body.message;
    const testPhoneNumber = process.env.TEST_PHONE_NUMBER as string;

    if (!userMessage) {
        res.status(400).json({ error: 'message is missing.' });
    }

    try {
        await TwilioService.sendMessageTo(testPhoneNumber, userMessage);
        res.json({ reply: 'message sent' });
    } catch (error) {
        console.error('error sending message', error);
        res.status(500).json({ error: 'error sending message' });
    }
});

router.post("/incoming", upload.single('Media'), async (req: Request, res: Response) => {
  try {
    console.log('incoming message:', req.body.Body);
    await TwilioService.processIncomingMessage(req.body);
    res.json({ success: true });     
  } catch (error) {
    console.error('[Error][incoming message]', error);
    res.status(500).json({ error: 'error processing message' });
  }
});

export default router;
