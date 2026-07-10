import { randomUUID } from "crypto";
import type { Request, Response, NextFunction } from 'express';

export const requestIdHandler = (req: Request, res: Response, next: NextFunction) => {
  req.requestId = randomUUID();
  next();
};