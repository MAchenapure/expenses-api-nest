import { HttpException, HttpStatus } from "@nestjs/common";
import { errorMessages } from "./error-messages";

export class ApiException extends HttpException {
    constructor(name: string, code: string, httpStatus: HttpStatus, err?: HttpException) {
        const message = (errorMessages[name] && errorMessages[name][code]) ?? errorMessages['Common']['internal-error'];

        super(message, httpStatus);

        this.name = name;
        this.code = code;
    }

    public readonly name: string;
    public readonly code: string;
}