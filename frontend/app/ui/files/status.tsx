import { CheckIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function FileStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-blue-600 text-white': status === 'processing',
          'bg-green-400 text-white': status === 'completed',
        },
      )}
    >
      {status === 'processing' ? (
        <>
          Pending
          <EllipsisHorizontalIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === 'completed' ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
