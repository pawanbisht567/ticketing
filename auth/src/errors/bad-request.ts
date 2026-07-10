import { AppError } from "./app-error";
import { errorCode, errorStatusCode } from "./error-utility";

export class BadRequestError extends AppError {

  readonly statusCode = errorStatusCode.BAD_REQUEST;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serialize() {
    return [
      {
        code: errorCode.BAD_REQUEST,
        message: this.message
      }
    ];
  }

}