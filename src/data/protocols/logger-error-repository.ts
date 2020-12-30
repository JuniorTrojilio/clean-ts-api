export interface LoggerErrorRepository {
  loggerError (stack: string): Promise<void>
}
