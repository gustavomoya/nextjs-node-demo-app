import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import {login} from "@/app/lib/auth/auth-service";

import { z } from 'zod';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        credentials: {
            username: { label: "Username" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;

                const res = await login({
                    email,
                    password
                });

                if (!res.ok) return null;

                const data = await res.json();

                return {
                    id: data.user.id,
                    email: data.user.email,
                    accessToken: data.token, // 👈 JWT del backend
                };
            }

            return null;
        },
    })]
});