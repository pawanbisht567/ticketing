import express, { Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/userSchema';
import { BadRequestError } from '../errors/bad-request';
import { signinSchema } from '../utility/signin-request';
import { requestValidatorSignin } from '../middlewares/request-validator';
import { comparePasswords } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router()


router.post('/api/users/signin', requestValidatorSignin, async (req: Request, res: Response) => {
  // Validate input
  const validatedData = signinSchema.safeParse(req.body);
  if (!validatedData.success) {
    throw new RequestValidationError(validatedData.error);
  }

  let { email, password } = validatedData.data;

  // Process valid signup logic here
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }

  const isPasswordMatch = await comparePasswords(existingUser.password, password);
  if (!isPasswordMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: existingUser.id,
      email: existingUser.email,
    },
    process.env.JWT_KEY!,  // ! means, hey TS compiler don't worry about it, I know what I'm doing, this will never be undefined, already make the check in the index.ts file, if it is undefined, the app will not start
    { expiresIn: '15m' },
  );

  // Store the JWT token in the session Object
  req.session = { // this is not direct JWT token, this JSON Base64 encoded string, which contains our JWT token
    jwt: token,
  }

  res.status(200).send({ existingUser });
})

export { router as signinRouter }