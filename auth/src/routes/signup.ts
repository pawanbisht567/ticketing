import express from 'express';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/userSchema';
import { BadRequestError } from '../errors/bad-request';
import { requestValidatorSignup } from '../middlewares/request-validator';
const router = express.Router()

router.post('/api/users/signup', requestValidatorSignup, async (req: Request, res: Response) => {

  const { email, password } = req.body;
  // Process valid signup logic here

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  const user = User.build({ email, password });
  await user.save();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,  // ! means, hey TS compiler don't worry about it, I know what I'm doing, this will never be undefined, already make the check in the index.ts file, if it is undefined, the app will not start
    { expiresIn: '15m' },
  );

  req.session = { // this is not direct JWT token, this JSON Base64 encoded string, which contains our JWT token
    jwt: token,
  }

  res.status(201).send({ user });
});

export { router as signupRouter }