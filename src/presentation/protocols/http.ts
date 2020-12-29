export interface HttpResponse<T = any > {
  statusCode: number
  body: T
}

export interface HttpResquest<T = any> {
  body?: T
}
