import { FileSystem } from '@/components/file-system/file-system';
import { Headers } from '@/components/file-system/headers/headers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { Box, FileSystemItem } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {
    box: Box;
    items: FileSystemItem[];
    nextCursor: string | null;
};

export default function BoxPage({
    box,
    items: initialItems,
    nextCursor: initialNextCursor,
}: Props) {
    useSyncFilesystem({
        boxId: box.id,
    });

    return (
        <AuthenticatedLayout
            headers={<Headers variant="box" breadcrumbs={box.breadcrumbs} />}
        >
            <Head title={box.name} />

            <FileSystem
                initialItems={initialItems}
                initialNextCursor={initialNextCursor}
                upLink={route('boxes.index')}
            />
        </AuthenticatedLayout>
    );
}
