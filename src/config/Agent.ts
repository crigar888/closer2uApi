import mongoose from 'mongoose';

class AgentConfig {

  private _agent = `projects/${process.env.DIALOGFLOW_PROJECT_ID}/locations/${process.env.DIALOGFLOW_AGENT_LOCATION}/agents/${process.env.DIALOGFLOW_AGENT_ID}`;

  public get agent() {
    return this._agent;
  }

}

export default new AgentConfig();