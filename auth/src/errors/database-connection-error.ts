import { AppError, SerializedError } from "./app-error";
import { errorCode, errorStatusCode } from "./error-utility";


export class DatabaseConnectionError extends AppError {
  readonly statusCode = errorStatusCode.SERVICE_UNAVAILABLE;

  constructor(private readonly errors: SerializedError[]) {
    super(errorCode.SERVICE_UNAVAILABLE);
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serialize() {
    return this.errors
  }
}