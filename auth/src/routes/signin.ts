import express, { Request, Response } from 'express';
import * as z from 'zod';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/userSchema';
import { BadRequestError } from '../errors/bad-request';
const router = express.Router()



export const signinSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .min(1, "Email is required"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

export type SigninInput = z.infer<typeof signinSchema>;

router.post('/api/users/signin', async (req: Request, res: Response) => {
  // Validate input
  console.log('Request body:', req.body); // Log the request body for debugging
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
})

export { router as signinRouter }