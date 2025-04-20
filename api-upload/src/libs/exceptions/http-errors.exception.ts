import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidServerErrorException extends HttpException {
    constructor(
        description: string,
    ) {
        super("Invalid Server Error", HttpStatus.INTERNAL_SERVER_ERROR, {
            cause: new Error("Invalid Server Error"),
            description,
        });
    }
}