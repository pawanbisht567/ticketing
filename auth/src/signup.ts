import express from 'express';
import type { Request, Response } from 'express';
import * as z from 'zod';
const router = express.Router()

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password cannot exceed 32 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;

router.post('/api/users/signup', (req: Request, res: Response) => {

  // Validate input
  const validatedData = signupSchema.safeParse(req.body);

  if (!validatedData.success) {
    return res.status(400).json({
      errors: validatedData.error.flatten().fieldErrors,
    });
  }

  const { email, password } = validatedData.data;

  // Process valid signup logic here
  res.send('Signup successful!');
});

export { router as signupRouter }