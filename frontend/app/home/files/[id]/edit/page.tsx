import Form from '@/app/ui/files/edit-form';
import Breadcrumbs from '@/app/ui/files/breadcrumbs';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {getFile} from '@/app/lib/files/file-service';
import {UpFile} from "@/app/lib/definitions";

export default async function Page(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const file: UpFile = await getFile(id);

    return (
        <div className="w-full">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Files', href: '/home' },
                    {
                        label: 'Edit File',
                        href: `/home/files/${id}/edit`,
                        active: true,
                    },
                ]}
            />

            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Upload a file</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form file={file}/>
                </CardContent>
            </Card>
        </div>
    );
}
