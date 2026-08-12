import express from 'express';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';

const router = express.Router()

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.status(401).send({ currentUser: null });
  }

  try {

    const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!);
    return res.send({ currentUser: payload });
  } catch (err) {
    return res.status(401).send({ currentUser: null });
  }
})

export { router as currentUserRouter }