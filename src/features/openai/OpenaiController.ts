import { Request, Response, Router } from 'express';
import OpenaiService from './OpenaiService';

const router = Router();  

router.post('/new', async (req: Request, res: Response): Promise<any> => {
    const userMessage = req.body.message;
    const from = `whatsapp:+${req.body.from}`;
    if (!userMessage) {
      return res.status(400).json({ error: 'message is missing.' });
    }
    try {
      const response = '';
      return res.json({ response });
    } catch (error) {
      console.error('error doing openAI request', error);
      return res.status(500).json({ error: 'error in the request' });
    }
  });

router.get('/new', async (req: Request, res: Response): Promise<any> => {
    console.log('incoming message:  hola');
  });

export default router;
