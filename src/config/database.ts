import mongoose from 'mongoose';

class Database {
  private clientOptions = { serverApi: { version: "1" as const, strict: true, deprecationErrors: true } };

  public async runConnection(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string, this.clientOptions);
      if (mongoose.connection.db) {
        await mongoose.connection.db.admin().command({ ping: 1 });
      } else {
        throw new Error("Database connection is undefined");
      }
      console.info('[INFO] Successfully connected to MongoDB!');
    } catch (error) {
      await mongoose.disconnect();
      console.error('[ERROR] Database disconnected!', error);
    }
  }
}

export default new Database();