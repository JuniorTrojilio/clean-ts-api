import { Collection, MongoClient } from 'mongodb'
let client: MongoClient
let lUri: string

export const MongoHelper = {
  async connect (uri: string): Promise<void> {
    lUri = uri
    client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    /* istanbul ignore next */
    if (!client?.isConnected()) {
      await this.connect(lUri)
    }
    return client.db().collection(name)
  },

  mapper: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
