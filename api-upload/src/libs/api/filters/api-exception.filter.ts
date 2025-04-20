import { HttpException, HttpStatus } from '@nestjs/common'
import { StatusCode } from 'src/libs/exceptions/codes.exception'

export class ApiException extends HttpException {
    private errorMessage: string
    private errorCode: StatusCode
  
    constructor(
      errorMessage: string,
      errorCode: StatusCode,
      statusCode: HttpStatus
    ) {
      super(errorMessage, statusCode)
      this.errorMessage = errorMessage
      this.errorCode = errorCode
    }
  
    getErrorCode(): StatusCode {
      return this.errorCode
    }
  
    getErrorMessage(): string {
      return this.errorMessage
    }
  }