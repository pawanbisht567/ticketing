import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router()

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  res.send('Hello Pawan!')
})

export { router as currentUserRouter }