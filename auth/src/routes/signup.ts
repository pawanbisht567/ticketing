import express from 'express';
import type { Request, Response } from 'express';
import * as z from 'zod';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/userSchema';
import { BadRequestError } from '../errors/bad-request';
const router = express.Router()

export const signupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;

router.post('/api/users/signup', async (req: Request, res: Response) => {

  // Validate input
  const validatedData = signupSchema.safeParse(req.body);
  if (!validatedData.success) {
    throw new RequestValidationError(validatedData.error);
  }

  const { email, password } = validatedData.data;
  // Process valid signup logic here

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
});

export { router as signupRouter }