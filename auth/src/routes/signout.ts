import express, { Request, Response } from 'express';
import { authCode } from '../utility/error-utility';
const router = express.Router()

router.get('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;
  res.status(200).send({ code: authCode.SIGNOUT_SUCCESS });
})

export { router as signoutRouter }