import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

class OpenRouterService {
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    this.model = 'deepseek/deepseek-r1:free';
  }

  async sendMessage(exampleMessage: any): Promise<string | null> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: this.model,
          messages: [
            {
              role: "system",
              content: "Extract product features from the description field of each item. Return a JSON array where each object includes the original `_id` and a `features` object with boolean values only. Feature keys must be in `snake_case`, in the original language, and clearly implied by the description. Respond only with the JSON output. Example input:\n\n[\n  {\n    \"_id\": \"p001\",\n    \"description\": \"Smartwatch con monitor de ritmo cardíaco, diseño impermeable, batería de 7 días y seguimiento del sueño.\"\n  }\n]\n\nExpected output:\n\n[\n  {\n    \"_id\": \"p001\",\n    \"features\": {\n      \"monitor_de_ritmo_cardiaco\": true,\n      \"impermeable\": true,\n      \"batería_7_días\": true,\n      \"seguimiento_del_sueño\": true\n    }\n  }\n]"
            },
            {
              role: "user",
              content: JSON.stringify(exampleMessage)
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'https://tusitio.com', // opcional pero recomendado
            'X-Title': 'closer2u',
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error: any) {
      console.error('Error al consultar OpenRouter:', error.response?.data || error.message);
      return null;
    }
  }
}

export default new OpenRouterService();
