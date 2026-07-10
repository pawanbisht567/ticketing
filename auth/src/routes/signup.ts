import express from 'express';
import type { Request, Response } from 'express';
import * as z from 'zod';
import { RequestValidationError } from '../errors/request-validation-error';
const router = express.Router()

export const signupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;

router.post('/api/users/signup', (req: Request, res: Response) => {

  // Validate input
  const validatedData = signupSchema.safeParse(req.body);
  if (!validatedData.success) {
    console.log(validatedData)
    throw new RequestValidationError(validatedData.error.issues.map((issue) => ({
      code: issue.code,
      message: issue.message,
      field: issue.path.join('.'),
    })));
  }

  const { email, password } = validatedData.data;
  // Process valid signup logic here
  res.json({ email, password, msg: 'Signup successful!' });
});

export { router as signupRouter }