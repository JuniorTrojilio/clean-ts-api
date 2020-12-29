import { Request, Response } from 'express'
import { Controller, HttpResquest } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response): Promise<void> => {
    const httpRequest: HttpResquest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
