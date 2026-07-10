import type { Request, Response, NextFunction } from 'express';
import { errorCode, errorStatusCode } from '../errors/error-utility';
import { AppError } from '../errors/app-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError) {
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