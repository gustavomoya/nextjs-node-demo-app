'use server';

import {State, UpFile} from "@/app/lib/definitions";
import {revalidatePath} from "next/cache";
import { redirect } from 'next/navigation';
import {createFile, putFile, removeFile} from "@/app/lib/files/file-service";
import {CreateFile, UpdateFile} from "@/app/lib/files/file-schema";

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
        await createFile(rawFormData);

    } catch (e) {
        return  {
            message: 'Something went wrong.'
        };
    }

    revalidatePath('/home');
    redirect('/home');
}

export async function updateFile(id: number, prevState: State, formData: FormData) {
    const rawFormData = {
        id: id,
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

    try {
        const data = {
            id,
            filename: rawFormData.filename
        };

        if (rawFormData.content) {
           data.content =  rawFormData.content;
        }

        await putFile(data);
    } catch (e) {
        return  {
            message: 'Something went wrong.'
        };
    }

    revalidatePath('/home');
    redirect('/home');
}

export async function deleteFile(id: number) {
    console.log(id);

    await removeFile(id);

    revalidatePath('/home');
    redirect('/home');
}