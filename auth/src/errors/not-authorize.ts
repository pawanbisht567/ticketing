import { AppError } from "./app-error";
import { errorCode, errorStatusCode } from "../utility/error-utility";

export class NotAuthorizeError extends AppError {
  statusCode = errorStatusCode.UNAUTHORIZED;

  constructor() {
    super('Not authorize to access this resource!');
    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }

  serialize() {
    return [
      {
        code: errorCode.UNAUTHORIZED,
        message: 'Not authorize to access this resource!'
      }
    ];
  }
}