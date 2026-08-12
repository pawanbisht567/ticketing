import * as z from 'zod';

export const signupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;