import { AppError, SerializedError } from "./app-error";
import { errorCode, errorStatusCode } from "./error-utility";

export class RequestValidationError extends AppError {
  readonly statusCode = errorStatusCode.INVALID_INPUT;

  constructor(private readonly errors: SerializedError[]) {
    super(errorCode.INVALID_INPUT);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize() {
    return this.errors
  }
}