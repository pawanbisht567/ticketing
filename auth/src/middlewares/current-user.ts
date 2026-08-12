import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorCode, errorStatusCode } from '../utility/error-utility';
import { UserPayload } from '../utility/user-payload';


export const currentUser = (req: Request, res: Response, next: NextFunction) => {

  try {
    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
  } catch (err) {
    return res.status(errorStatusCode.UNAUTHORIZED).send({ code: errorCode.UNAUTHORIZED });
  }

  next();

}