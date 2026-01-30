import Form from '@/app/ui/files/create-form';
import Breadcrumbs from '@/app/ui/files/breadcrumbs';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default async function Page() {
    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Files', href: '/home' },
                    {
                        label: 'Upload File',
                        href: '/home/files/create',
                        active: true,
                    },
                ]}
            />

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Create</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form/>
                </CardContent>
            </Card>
        </div>
    );
}
