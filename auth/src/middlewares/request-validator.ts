import { NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { signupSchema } from '../utility/signup-request';
import { signinSchema } from '../utility/signin-request';

export const requestValidatorSignup = (req: Request, res: Response, next: NextFunction) => {
  const validatedData = signupSchema.safeParse(req.body);
  if (!validatedData.success) {
    throw new RequestValidationError(validatedData.error);
  }

  req.body = validatedData.data; // Update the request body with the validated data
  next();
}

export const requestValidatorSignin = (req: Request, res: Response, next: NextFunction) => {
  const validatedData = signinSchema.safeParse(req.body);
  if (!validatedData.success) {
    throw new RequestValidationError(validatedData.error);
  }

  req.body = validatedData.data; // Update the request body with the validated data
  next();
}