import type { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { errorCode, errorStatusCode } from '../errors/error-utility';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).json({
      errors: err.serialize(),
      requestId: req.requestId
    });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).json({
      errors: err.serialize(),
      requestId: req.requestId
    });
  }

  res.status(errorStatusCode.INTERNAL_SERVER_ERROR).json({
    errors: [{
      code: errorCode.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong. Please try again later!'
    }],
    requestId: req.requestId
  });
};