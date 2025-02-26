import twilio from 'twilio';
import axios from 'axios';
import { IncomingMessage } from './TwilioInterfaces';
import AudioService from '../audio/AudioService';
import DialogFlowService  from '../dialogFlow/DialogFlowService';

const dotenv = require('dotenv');
dotenv.config();

class TwilioService {
  private accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  private authToken = process.env.TWILIO_AUTH_TOKEN as string;
  private client = twilio(this.accountSid, this.authToken);
  private twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER as string;
  private whatsappRegex = /^whatsapp:\+[1-9]\d{1,14}$/;
    
  public async processIncomingMessage(dataMessage: IncomingMessage): Promise<void> {
    const body = dataMessage.Body;
    const from = dataMessage.From;
    const mediaUrl = dataMessage.MediaUrl0;
    const mediaContentType = dataMessage.MediaContentType0;
    let incomingText = null;
    if (mediaUrl && mediaContentType?.startsWith('audio')) {
        incomingText = await this.getTextFromAudio(from, mediaUrl, mediaContentType);
    } else {
        incomingText = body;
    }
    if (incomingText) {
      console.log('mensaje:', incomingText);
      // const textResponse = await OpenaiService.newMessage(incomingText);
      // const rasaResponse: RasaResponse = await RasaService.getReply(from, incomingText);
      // if (rasaResponse) {
      //   //console.log('rasaResponse', rasaResponse);
      //   await this.sendMessageTo(from, rasaResponse.text);
      // }
      const reply = await DialogFlowService.test(incomingText);
      if (reply) {
        await this.sendMessageTo(from, reply);
      }
    }
    console.log('mensaje:', incomingText);
  }

  public async sendMessageTo(whatsappNumber: string, message: string): Promise<void> {
    if (!this.isValidWhatsAppContact(whatsappNumber)) {
      throw new Error('Invalid whatsapp number');
    }

    await this.client.messages.create({
      body: message,
      from: this.twilioPhoneNumber,
      to: whatsappNumber,
    });
  }

  private async getTextFromAudio(from: string, mediaUrl: string, mediaContentType: string): Promise<string | null> {
    let incomingText = null;
    const dataAudio = await axios.get(mediaUrl, {
      responseType: 'arraybuffer',
      auth: {
          username: this.accountSid,
          password: this.authToken,
      },
    });
    const audioResponse = await AudioService.getAudioTranscript(dataAudio.data, mediaContentType);
    if (audioResponse.success && audioResponse.transcript) {
        incomingText = audioResponse.transcript;
    } else {
        console.warn('[WARN] Audio service is disabled');
    }
    return incomingText;
  }

  private isValidWhatsAppContact(whatsappNumber: string): boolean {
    return this.whatsappRegex.test(whatsappNumber);
  }

}

export default new TwilioService();