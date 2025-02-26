import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import * as dialogflow from "@google-cloud/dialogflow-cx";
import { protos } from "@google-cloud/dialogflow-cx";

dotenv.config();

const projectId = process.env.DIALOGFLOW_PROJECT_ID as string;
const location = process.env.DIALOGFLOW_LOCATION as string;
const agentId = process.env.DIALOGFLOW_AGENT_ID as string;
const languageCode = process.env.DIALOGFLOW_LANGUAGE as string;
const sessionId = uuidv4();

const client = new dialogflow.SessionsClient();

class DialogFlowService {
  
    public async test(userMessage: string): Promise<string | null | undefined> {
      const sessionPath = client.projectLocationAgentSessionPath(
        projectId,
        location,
        agentId,
        sessionId
      );

      const request: protos.google.cloud.dialogflow.cx.v3.IDetectIntentRequest = {
        session: sessionPath,
        queryInput: {
          text: { text: userMessage },
          languageCode,
        },
      };

      const [response] = await client.detectIntent(request);
      let responseText;;
      if (response?.queryResult?.responseMessages) {
        if (response?.queryResult?.responseMessages[0]?.text?.text) {
          responseText = response?.queryResult?.responseMessages[0]?.text?.text[0];
        }
      } else {
        responseText = '';
      }
      return responseText;
    }
    

}

export default new DialogFlowService();