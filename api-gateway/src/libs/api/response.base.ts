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
    static success(data: any = {}, message = 'success'): ResponseBase {
        return {
            ok: true,
            code: StatusCode.SUCCESS,
            message,
            data,
            timestamp: new Date(),
        }
    }

    static fail(code: number, message: string, details: any = null) {
        return {
            ok: false,
            code,
            message,
            data: null,
            details,
            timestamp: new Date(),
        }
    }
}