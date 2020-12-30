import { LoggerErrorRepository } from '../../data/protocols/logger-error-repository'
import { Controller, HttpResponse, HttpResquest } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller
  private readonly loggerErrorRepository: LoggerErrorRepository
  constructor (controller: Controller, loggerErrorRepository: LoggerErrorRepository) {
    this.controller = controller
    this.loggerErrorRepository = loggerErrorRepository
  }

  async handle (httpRequest: HttpResquest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.loggerErrorRepository.loggerError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
