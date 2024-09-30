import { Button } from '@/components/ui/button';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { IconHome, IconPackageImport } from '@tabler/icons-react';

type Props = {
    children: React.ReactNode;
    header?: React.ReactNode;
    headers?: React.ReactNode;
};

export default function Authenticated({ children, header, headers }: Props) {
    useSyncFilesystem({});
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-[99svh]">
            <div className="border-b bg-background shadow">
                <nav className="container flex items-center justify-between py-4">
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
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                Log Out
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>

            {header && (
                <header>
                    <div className="container flex items-center gap-2 py-4">
                        {header}
                    </div>
                </header>
            )}

            {headers && headers}

            <main>{children}</main>
        </div>
    );
}
