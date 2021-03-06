import { Request, Response } from 'express'
import { Controller, HttpResquest } from '../../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response): Promise<void> => {
    const httpRequest: HttpResquest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
