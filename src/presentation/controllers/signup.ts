import { MissingParamError } from '../errors/missing-param-error'
import { HttpResponse, HttpResquest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpResquest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    } else {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }
  }
}
