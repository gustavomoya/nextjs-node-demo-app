'use client';

import {State, UpFile} from '@/app/lib/definitions';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useActionState} from "react";
import { updateFile } from '@/app/lib/files/file-actions';


export default function EditFileForm({
  file
}: {
  file: UpFile;
}) {

  const updateFileWithId = updateFile.bind(null, file.id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(updateFileWithId, initialState);

  return (
      <form action={formAction}>
        <div className="rounded-md p-4 md:p-6">
          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="name">Name
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                  id="name"
                  name="filename"
                  type="name"
                  placeholder="Enter the name"
                  defaultValue={file.filename}
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
