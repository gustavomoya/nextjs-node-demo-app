import SignUpForm from '@/app/ui/register/sign-up-form';
import { Suspense } from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="flex items-center justify-center md:h-screen bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className='flex justify-between'>
                        <CardTitle>Create account</CardTitle>
                        <div className='leading-none'>
                            <Link href="/login">
                                Login
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Suspense>
                        <SignUpForm/>
                    </Suspense>
                </CardContent>
            </Card>
        </main>
    );
}