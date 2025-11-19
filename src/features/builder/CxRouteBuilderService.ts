import { PagesClient } from '@google-cloud/dialogflow-cx';

const dotenv = require('dotenv');
dotenv.config();

class CxRouteBuilderService {

    private client: PagesClient;

    constructor() {
        this.client = new PagesClient();
    }

    public async createPage() {
        const parent = `projects/${process.env.DIALOGFLOW_PROJECT_ID}/locations/${process.env.DIALOGFLOW_AGENT_LOCATION}/agents/${process.env.DIALOGFLOW_AGENT_ID}/flows/${process.env.DIALOGFLOW_FLOW_ID}`;
        const request = {
            parent,
            page: {
            'displayName': 'New Page',
            entryFulfillment: {
                messages: [
                {
                    text: { text: ['Welcome to the new page!'] }
                }
                ]
            }
            }
        };

        await this.client.createPage(request);
    }
}

export default new CxRouteBuilderService();