import { AppError, SerializedError } from "./app-error";
import { errorCode, errorStatusCode } from "./error-utility";
import { ZodError } from "zod";

export class RequestValidationError extends AppError {
  readonly statusCode = errorStatusCode.INVALID_INPUT;

  constructor(private readonly errors: ZodError) {
    super(errorCode.INVALID_INPUT);
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serialize() {
    return this.errors.issues.map(issue => ({
      code: issue.code,
      message: issue.message,
      field: issue.path.join("."),
    }));
  }
}