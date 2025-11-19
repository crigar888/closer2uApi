import { IntentsClient } from '@google-cloud/dialogflow-cx';
import AgentConfig from '../../config/Agent';

const dotenv = require('dotenv');
dotenv.config();

class CxIntentBuilderService {

  constructor() {
  }

  public async createIntent(displayName: string) {
    try {
      const trainingPhrases = ['que colores tiene'];
      const client = new IntentsClient();
      const request = {
          parent: AgentConfig.agent,
          intent: {
              displayName,
              trainingPhrases: trainingPhrases.map(phrase => ({
                  parts: [{ text: phrase }],
                  repeatCount: 1,
              })),
              
          }
      };

      const [response] = await client.createIntent(request);
      console.log(`✅ Intent creada: ${response.name}`);
    } catch (err) {
      console.error('❌ Error creando la intent:', err);
    }
  }
}

export default new CxIntentBuilderService();