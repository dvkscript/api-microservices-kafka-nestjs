import { StatusCode } from "../exceptions/codes.exception"

export interface ResponseBase {
    code: number
    message: string
    data: any
    ok: boolean,
    details?: any,
    timestamp: Date,
}

export class ResponseBase {
    static success(data: any = {}, message = 'success', code?: number): ResponseBase {
        return {
            ok: true,
            code: code || StatusCode.SUCCESS,
            message,
            data,
            timestamp: new Date(),
        }
    }

    static fail(code: number, message: string, details?: string, errors: any = null) {
        return {
            ok: false,
            code: code || StatusCode.INTERNAL_SERVER_ERROR,
            message,
            data: null,
            details,
            errors,
            timestamp: new Date(),
        }
    }
}