import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpResponse, HttpResquest } from '../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpResquest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    } else {
      return badRequest(new MissingParamError('email'))
    }
  }
}
