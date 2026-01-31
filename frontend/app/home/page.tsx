import FilesTable from '@/app/ui/home/file-table';
import {CreateFile} from "@/app/ui/files/buttons";
import {SkeletonCardTable} from "@/app/ui/skeletons";
import {Suspense} from "react";

export default async function Page() {

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className='text-2xl'>List of Files</h1>
                <CreateFile/>
            </div>
            <Suspense fallback={<SkeletonCardTable />}>
                <FilesTable/>
            </Suspense>
        </div>
    );
}
