'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import {Input} from "@/components/ui/input"
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import { useActionState } from 'react';
import {signUp} from '@/app/lib/auth/auth-actions';
import {
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {UserFormSate} from "@/app/lib/definitions";

export default function LoginForm() {
  const initialState: UserFormSate = { message: null, errors: {} };
  const [state, formAction] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <div className="w-full">
          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="name">
                Name <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="Enter the name"
              />
              <FieldError>
                {state.errors?.name ? state.errors.name.join(", ") : ''}
              </FieldError>
            </Field>
          </div>

          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="email">
                Email <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
              />
              <FieldError>
                {state.errors?.email ? state.errors.email.join(", ") : ''}
              </FieldError>
            </Field>
          </div>
          <div className="mb-4">
            <Field>
              <FieldLabel htmlFor="password">
                Password <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
              />
            </Field>
            <FieldError>
              {state.errors?.password ? state.errors.password.join(", ") : ''}
            </FieldError>
          </div>
          <Field>
            <FieldLabel htmlFor="confirmPassword">
              Confirm Password <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
            />
          </Field>
          <FieldError>
            {state.errors?.confirmPassword ? state.errors.confirmPassword.join(", ") : ''}
          </FieldError>
        </div>
        <Button className="mt-4 w-full" type="submit">
          Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50"/>
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {state.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500"/>
                <p className="text-sm text-red-500">{state.message}</p>
              </>
          )}
        </div>
      </div>
    </form>
  );
}
