import { LoggerErrorRepository } from '../../data/protocols/logger-error-repository'
import { AccountModel } from '../../domain/models/account'
import { serverError, ok } from '../../presentation/helpers/http-helper'
import { Controller, HttpResponse, HttpResquest } from '../../presentation/protocols'
import { LogControllerDecorator } from './logger'

interface SutTypes{
  sut: LogControllerDecorator,
  controllerStub: Controller,
  loggerErrorRepositoryStub: LoggerErrorRepository
}

const makeFakeStackServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid_password'
})

const makeFakeRequest = (): HttpResquest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeLoggerErrorRepository = (): LoggerErrorRepository => {
  class LoggerErrorRepositoryStub implements LoggerErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LoggerErrorRepositoryStub()
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpResquest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(ok(makeFakeAccount())))
    }
  }
  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const loggerErrorRepositoryStub = makeLoggerErrorRepository()
  const sut = new LogControllerDecorator(controllerStub, loggerErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    loggerErrorRepositoryStub
  }
}

describe('Logger Controller Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest())
  })

  test('should return the same result of the controller handle', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
  })

  test('should call LoggerErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, loggerErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(loggerErrorRepositoryStub, 'log')

    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeStackServerError())))
    await sut.handle(makeFakeRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
