'use server';

import {UserFormSate} from "@/app/lib/definitions";
import {register} from "@/app/lib/auth/auth-service";
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {LoginSchema, RegisterSchema} from "@/app/lib/auth/auth-schema";


/**
 * Authenticate user
 *
 * @param prevState
 * @param formData
 */
export async function authenticate(prevState: string | undefined, formData: FormData) {
    const parsed = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsed.success) {
        return 'Invalid Fields';
    }

    try {
        await signIn('credentials', formData);
    } catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        throw e;
    }
}

/**
 * Register a new user
 *
 * @param prevState
 * @param formData
 */
export async function signUp(prevState: UserFormSate, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const parsed = RegisterSchema.safeParse(data);

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors
        };
    }

    const { name, email, password } = parsed.data;

    try {
        const res = await register({ name, email, password });

        if (!res.ok) {
            return  {
                message: 'User already exists.'
            };
        }

    } catch (e) {
        return  {
            message: 'Something went wrong.'
        };
    }

    //authenticate
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/home",
    });
}