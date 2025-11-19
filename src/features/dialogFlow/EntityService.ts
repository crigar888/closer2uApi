import * as dotenv from 'dotenv';
import { EntityTypesClient } from '@google-cloud/dialogflow-cx';
import AgentConfig from '../../config/Agent';
import { Product } from '../../interfaces/product';

dotenv.config();

class IntentService {
    private entityClient: EntityTypesClient;

    constructor() {
        this.entityClient = new EntityTypesClient();
    }

    /**
   * Create an entity in Dialogflow CX with all product references from MongoDB
   * @param {Array<any>} products - Array of product objects from Mongo
   * @param {string} entityDisplayName - Name of the entity in Dialogflow CX
   */
    public async createReferenceEntity(products: Product[], entityDisplayName: string) {
        try {

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
