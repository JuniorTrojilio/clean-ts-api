import { MongoClient } from 'mongodb'
import { disconnect } from 'process'

let client: MongoClient

export const MongoHelper = {
  async connect (uri: string): Promise<void> {
    client = await MongoClient.connect(process.env.MONGO_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await client.close()
  }
}
