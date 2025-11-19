import Database from "../../config/database";

const dotenv = require('dotenv');
dotenv.config();

class DataBaseService {


    constructor() {
    }

    public async saveCollection(colName: string, rows: any[]) {
        try {
            if (!Database.db) {
                throw new Error("Database connection is not initialized.");
            }
            const collection = Database.db.collection(colName);

            await collection.deleteMany({});
            const result = await collection.insertMany(rows);
            console.log(`✅ ${result.insertedCount} records inserted into MongoDB`);
        } catch (err) {
            console.error('❌ Error inserting data into MongoDB:', err);
        }
    }
    
    
}

export default new DataBaseService();