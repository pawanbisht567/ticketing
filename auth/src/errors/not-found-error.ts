import { AppError, SerializedError } from "./app-error";
import { errorCode, errorStatusCode } from "./error-utility";


export class NotFoundError extends AppError {
  readonly statusCode = errorStatusCode.NOT_FOUND;

  constructor() {
    super(errorCode.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serialize() {
    return [
      {
        code: errorCode.NOT_FOUND,
        message: "Not Found"
      }
    ];
  }
}
