import LoginForm from '@/app/ui/login/login-form';
import { Suspense } from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from 'next/link';


export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen bg-gray-50">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <div className='flex justify-between'>
                        <CardTitle>Login to your account</CardTitle>
                        <div className='leading-none'>
                            <Link href="/register">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Suspense>
                        <LoginForm/>
                    </Suspense>
                </CardContent>
            </Card>
        </main>
    );
}