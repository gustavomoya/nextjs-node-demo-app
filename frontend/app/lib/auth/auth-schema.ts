import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password too short"),
});

export const RegisterSchema = z
    .object({
        name: z.string()
            .min(1, "Name is required")
            .max(255, "Name too long"),
        email: z.string().email(),
        password: z.string().min(6, "Enter a valid password"),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });