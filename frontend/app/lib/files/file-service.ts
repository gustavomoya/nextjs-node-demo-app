'use server';

import {API_URL} from "@/app/lib/api";
import {auth} from "@/auth";

export async function createFile({name, file, }: { name: string; file: File; }) {
    const session = await auth();
    const token = session.accessToken ? session.accessToken : null;

    const headers = {
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("file", file);

    const res = await fetch(`${API_URL}/files`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "POST",
        body: formData,
    });

    console.log(res);

    if (!res.ok) {
        throw new Error("Error en la API");
    }

    return res.json();
}

export async function listFiles() {
    const session = await auth();
    const token = session.accessToken ? session.accessToken : null;

    console.log(token);
    console.log(API_URL)
}