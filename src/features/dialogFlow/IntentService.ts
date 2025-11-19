import * as dotenv from 'dotenv';
import { EntityTypesClient } from '@google-cloud/dialogflow-cx';
import AgentConfig from '../../config/Agent';

dotenv.config();

class IntentService {
    private entityClient: EntityTypesClient;

    constructor() {
        this.entityClient = new EntityTypesClient();
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

    /**
   * Create an entity in Dialogflow CX with all product references from MongoDB
   * @param {Array<any>} products - Array of product objects from Mongo
   * @param {string} entityDisplayName - Name of the entity in Dialogflow CX
   */
    public async createReferenceEntity(products: any[], entityDisplayName: string) {
        try {
        // Extract unique references
        const uniqueReferences = [...new Set(products.map(p => p.reference?.trim()).filter(Boolean))];

        // Build entity entries
        const entities = uniqueReferences.map(ref => ({
            value: ref,
            synonyms: [ref], // could add lowercase or formatted variations
        }));

        const request = {
            parent: AgentConfig.agent,
            entityType: {
            displayName: entityDisplayName,
            kind: 'KIND_MAP', // exact match, not fuzzy
            entities,
            },
        };

        const [response] = await this.entityClient.createEntityType(request);
        console.log(`✅ Entity creada: ${response.name} (${entityDisplayName}) con ${entities.length} referencias`);
        } catch (err) {
        console.error('❌ Error creando la entity:', err);
        }
    }
}

export default new IntentService();
