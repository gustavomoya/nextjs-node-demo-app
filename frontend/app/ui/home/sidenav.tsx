import Link from 'next/link';
import { HomeIcon, PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { UserCircleIcon} from "@heroicons/react/24/solid";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
            className="mb-2 flex h-15 items-end justify-start rounded-md bg-blue-600 p-4"
            href="/home"
        >
            <div className="w-32 text-white md:w-40">
                <div
                    className="flex flex-row items-center leading-none text-white"
                >
                    <UserCircleIcon className="h-8 w-8"/>
                </div>
            </div>
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <Link
                className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              href="/home"
          >
              <HomeIcon className="w-6" />
             Home
          </Link>
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
            action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
            }}
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
