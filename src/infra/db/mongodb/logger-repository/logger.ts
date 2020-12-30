import { LoggerErrorRepository } from '../../../../data/protocols/logger-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class LoggerMongoRepository implements LoggerErrorRepository {
  async loggerError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
