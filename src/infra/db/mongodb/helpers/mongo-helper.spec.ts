import { MongoHelper } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('should reconnect if mongo db is down', async () => {
    let accountCollection = await MongoHelper.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await MongoHelper.disconnect()
    accountCollection = await MongoHelper.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
