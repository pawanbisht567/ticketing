export interface SerializedError {
  code: string;
  message: string;
  field?: string;
}

export abstract class AppError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serialize(): SerializedError[] | SerializedError;
}