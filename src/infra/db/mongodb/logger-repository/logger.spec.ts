import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoggerMongoRepository } from './logger'
let errorCollection: Collection

const makeSut = (): LoggerMongoRepository => {
  return new LoggerMongoRepository()
}

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
    const sut = makeSut()
    await sut.loggerError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
