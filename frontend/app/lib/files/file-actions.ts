'use server';

import { z } from 'zod';
import {State, UpFile} from "@/app/lib/definitions";
import {revalidatePath} from "next/cache";
import { redirect } from 'next/navigation';
import { signIn, auth } from '@/auth';
import {createFile, listFiles} from "@/app/lib/files/file-service";
import {CreateFile, UpdateFile} from "@/app/lib/files/file-schema";
import {register} from "@/app/lib/auth/auth-service";

export async function saveFile(prevState: State, formData: FormData) {
    const rawFormData = {
        filename: formData.get('filename'),
        content: formData.get('content'),
    };

    const parsed = CreateFile.safeParse(rawFormData);
    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Save a File.',
        };
    }

    try {
        const res = await createFile(rawFormData);

        if (!res.ok) {
            return  {
                message: 'User already exists.'
            };
        }

    } catch (e) {
        console.log(e)
        return  {
            message: 'Something went wrong.'
        };
    }

    revalidatePath('/home');
    redirect('/home');
}

export async function updateFile(id: number, prevState: State, formData: FormData) {
    const rawFormData = {
        filename: formData.get('filename'),
        content: formData.get('content') || undefined,
    };

    const parsed = UpdateFile.safeParse(rawFormData);
    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Save a File.',
        };
    }

    revalidatePath('/home');
    redirect('/home');
}

export async function deleteFile(id: number) {
    console.log(id);

    console.log('the id', id)

    revalidatePath('/home');
}

export async function getFiles(): Promise<Array<UpFile>> {
    try {

        const files: UpFile[] = [{id: 1, filename: 'myname', size: 125, created: "2025-12-05", content: '', user_id: 1}];

        return files;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}