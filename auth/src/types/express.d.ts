import "express";
import type { UserPayload } from "../utility/user-payload";

declare global {
  namespace Express {
    interface Request {
      requestId: string;
      currentUser?: UserPayload;
    }
  }
}