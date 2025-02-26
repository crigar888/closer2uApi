import axios from 'axios';
import dotenv from 'dotenv';
import { AudioResponse } from './AudioInterfaces';

dotenv.config();

class AudioService {
  private deepgramUrl = process.env.DEEPGRAM_URL as string;
  private deepgramApiKey = process.env.DEEPGRAM_API_KEY as string;
  private deepgramEnabled = process.env.DEEPGRAM_ENABLED === 'true';
  
  public async getAudioTranscript(dataAudio: any, mediaContentType: string): Promise<AudioResponse> {
    if (!this.deepgramEnabled) {
      return { success: false };
    }

    const transcriptResponse = await axios.post(
      this.deepgramUrl,
      dataAudio,
      this.getConfig(mediaContentType)
    );
    const transcript = transcriptResponse.data.results.channels[0].alternatives[0].transcript;
    return { transcript, success: true };;
  }

  private getConfig(mediaContentType: string): any {
    return {
      headers: {
          'Authorization': `Token ${this.deepgramApiKey}`,
          'Content-Type': mediaContentType,
      },
      params: {
          'language': 'es',
      },
    }
  }

}

export default new AudioService();