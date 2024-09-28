import { Button } from '@/components/ui/button';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { IconHome, IconPackageImport } from '@tabler/icons-react';
import { PropsWithChildren, ReactNode } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    useSyncFilesystem({});
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen">
            <div className="border-b bg-background shadow">
                <nav className="container flex items-center justify-between px-2 py-4">
                    <div className="flex items-center gap-3">
                        <Button
                            asChild
                            size="icon"
                            variant={
                                route().current('dashboard')
                                    ? 'default'
                                    : 'outline'
                            }
                            className={cn(
                                route().current('dashboard') &&
                                    'text-background',
                            )}
                        >
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-3"
                            >
                                <IconHome size={24} />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="icon"
                            variant={
                                route().current('boxes*') ||
                                route().current('folders*') ||
                                route().current('files*')
                                    ? 'default'
                                    : 'outline'
                            }
                            className={cn(
                                (route().current('boxes*') ||
                                    route().current('folders*') ||
                                    route().current('files*')) &&
                                    'text-background',
                            )}
                        >
                            <Link
                                href={route('boxes.index')}
                                className="flex items-center gap-3"
                            >
                                <IconPackageImport size={24} />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <p>{user.name}</p>

                        <Button asChild variant="outline">
                            <Link href={route('profile.edit')}>Profile</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={route('logout')} method="post">
                                Log Out
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>

            {header && (
                <header>
                    <div className="container flex items-center gap-2 px-2 py-6">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
