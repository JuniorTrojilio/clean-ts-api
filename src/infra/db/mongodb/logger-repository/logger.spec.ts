import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoggerMongoRepository } from './logger'
let errorCollection: Collection

describe('Logger Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an error log on sucess', async () => {
    const sut = new LoggerMongoRepository()
    await sut.loggerError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
