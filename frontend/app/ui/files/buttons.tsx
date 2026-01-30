"use client";

import {CloudArrowDownIcon, PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import Link from 'next/link';
import {deleteFile} from '@/app/lib/files/file-actions';

export function CreateFile() {
  return (
    <Link
      href="/home/files/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create File</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateFile({ id }: { id: number }) {
  return (
    <Link
        href={`/home/files/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteFile({ id }: { id: number }) {
  const deleteInvoiceWithId = deleteFile.bind(null, id);

  return (
      <form action={deleteInvoiceWithId}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5"/>
        </button>
      </form>
  );
}

export function DownloadFile({ id, name, originalName }: { id: number; name: string; originalName: string }) {
  const download = async () => {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/files/${id}/download`;
  };

  return (
      <button onClick={download} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Download</span>
        <CloudArrowDownIcon className="w-5"/>
      </button>
  );
}