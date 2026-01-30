'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import {Button} from '@/app/ui/button';
import {Input} from "@/components/ui/input"
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import { saveFile } from '@/app/lib/files/file-actions';
import {State} from '@/app/lib/definitions';


export default function Form() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(saveFile, initialState);

    return (
        <form action={formAction}>
            <div className="rounded-md p-4 md:p-6">
                <div className="mb-4">
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="filename"
                            type="name"
                            placeholder="Enter the name"
                        />
                        <FieldError>
                            {state.errors?.filename ? state.errors.filename.join(", ") : ''}
                        </FieldError>
                    </Field>
                </div>
                <div className="mb-4">
                    <Field>
                        <FieldLabel htmlFor="content">File</FieldLabel>
                        <Input id="content" name="content" type="file"/>
                        <FieldDescription>Select a file to upload.</FieldDescription>
                        <FieldError>
                            {state.errors?.content ? state.errors.content.join(", ") : ''}
                        </FieldError>
                    </Field>
                </div>
            </div>


            <div className="mt-6 flex justify-end gap-4">
                <Link
                    href="/home"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                    Cancel
                </Link>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
