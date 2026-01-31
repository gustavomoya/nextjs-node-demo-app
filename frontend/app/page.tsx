import Link from 'next/link';

export default function Page() {
  return (
      <main className="flex min-h-screen flex-col bg-gray-50 p-6">
            <div className="flex items-center justify-center md:h-screen">
                <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20">
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        Start your journey with <strong className="text-blue-500">Demo app.</strong>
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span>
                    </Link>
                </div>
            </div>
      </main>
  );
}
