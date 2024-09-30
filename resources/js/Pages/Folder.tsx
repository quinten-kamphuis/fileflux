import { FileSystem } from '@/components/file-system/file-system';
import { Headers } from '@/components/file-system/headers/headers';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { FileSystemItem, Folder } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {
    folder: Folder;
    items: FileSystemItem[];
    nextCursor: string | null;
};

export default function FolderPage({
    folder,
    items: initialItems,
    nextCursor: initialNextCursor,
}: Props) {
    useSyncFilesystem({
        folderId: folder.id,
        boxId: folder.boxId,
    });

    return (
        <AuthenticatedLayout
            headers={
                <Headers variant="folder" breadcrumbs={folder.breadcrumbs} />
            }
        >
            <Head title={folder.name} />

            <FileSystem
                upLink={folder.links.parent}
                initialItems={initialItems}
                initialNextCursor={initialNextCursor}
            />
        </AuthenticatedLayout>
    );
}
