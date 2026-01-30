'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import {Input} from "@/components/ui/input"
import {Field, FieldLabel} from "@/components/ui/field";
import { useActionState } from 'react';
import {authenticate} from '@/app/lib/auth/auth-actions';
import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

export default function LoginForm() {

  const [errorMessage, formAction, isPending] = useActionState(
      authenticate,
      undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={`mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
              />
            </Field>
          </div>
          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
              />
            </Field>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value='/home'/>
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
          )}
        </div>
      </div>
    </form>
  );
}
