import * as z from 'zod';

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