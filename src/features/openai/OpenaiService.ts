import { OpenAI  } from "openai";
import dotenv from 'dotenv';

dotenv.config();

class OpenaiService {
  private maxTokens: number | undefined = process.env.OPENAI_MAX_TOKENS_RES ? parseInt(process.env.OPENAI_MAX_TOKENS_RES) : undefined;
  private apiKey: string = process.env.OPENAI_API_KEY as string;
  private model: string = process.env.OPENAI_MODEL as string;
  private openaiAPIEnabled: boolean = process.env.OPENAI_ENABLED === 'true';

  public async newMessage(clientMessage: string): Promise<string | null> {
    if (this.openaiAPIEnabled) {
      const openai = new OpenAI({
        apiKey: this.apiKey,
      });
      const requestMsgConfig = this.getMessageConfig(clientMessage);
      const openaiResponse = await openai.chat.completions.create(requestMsgConfig);
      const openaiTxtResponse = openaiResponse.choices[0].message.content;
      const textResponse = openaiTxtResponse;
      if (!textResponse) {
        console.error('[ERROR] OpenAI response is empty');
      }
      return textResponse;
    } else {
      console.warn('[WARN] OpenAI service is disabled');
      return null;
    }
  }

  private getMessageConfig(clientMessage: string): any {
    const messageConfig: any = {
      model: this.model,
      messages: this.getMessages(clientMessage),
    };
    if (this.maxTokens) {
      messageConfig.max_tokens = this.maxTokens;
    }

    return messageConfig
  }

  private getMessages(clientMessage: string): { role: string; content: string }[] {
    return [
      {
        role: 'user',
        content: clientMessage,
      },
    ];
  }

}


export default new OpenaiService();