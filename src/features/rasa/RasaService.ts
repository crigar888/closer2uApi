import dotenv from 'dotenv';
import axios from 'axios';
import { RasaResponse } from './RasaInterfaces';

dotenv.config();

class RasaService {
  private rasaURL: string = process.env.RASA_API_URL as string;
  
  public async getReply(from: string, clientMessage: string): Promise<RasaResponse> {
    const rasaResponse = await axios.post(this.rasaURL, {
      sender: from,
      message: clientMessage,
    });
    return rasaResponse.data.length > 0 ? rasaResponse.data[0] : null;
  }
}

export default new RasaService();