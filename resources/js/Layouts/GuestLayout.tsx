import ApplicationLogo from '@/components/application-logo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-[99svh] flex-col items-center sm:justify-center sm:pt-0">
            <div>
                <Link href="/" className="flex items-end gap-2">
                    <ApplicationLogo className="size-14" />
                    <h2 className="text-4xl font-extrabold">FileFlux</h2>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden border px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
