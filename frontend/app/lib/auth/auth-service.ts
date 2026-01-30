import {API_URL} from "@/app/lib/api";

export async function login({email, password,}: { email: string; password: string; }) {
    return await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    });
}

export async function register({name, email, password,}: { name: string; email: string; password: string; }) {
    return await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password}),
    });
}