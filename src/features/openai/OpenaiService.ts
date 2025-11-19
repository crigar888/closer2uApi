import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Make sure it's defined in your .env
    });
  }

  public async chat(prompt: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o', // or 'gpt-3.5-turbo' if you prefer
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      });

      const reply = response.choices[0]?.message?.content ?? 'No response';
      console.log('OpenAI response:', reply);
      return reply;
    } catch (error) {
      console.error('OpenAI Error:', error);
      throw new Error('Failed to generate response');
    }
  }
}

export default new OpenaiService();
``
