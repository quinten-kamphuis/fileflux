import { FileCard } from '@/components/file-system/cards/file-card';
import { FolderCard } from '@/components/file-system/cards/folder-card';
import { UpCard } from '@/components/file-system/cards/up-card';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useModal } from '@/lib/context/modal-provider';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { Folder } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {
    folder: Folder;
};

export default function FolderPage({ folder }: Props) {
    useSyncFilesystem({
        folderId: folder.id,
        boxId: folder.boxId,
    });

    const { folders, files } = folder;

    const { showModal } = useModal();

    return (
        <AuthenticatedLayout
            header={
                <NavigationHeader
                    variant="folder"
                    breadcrumbs={folder.breadcrumbs}
                />
            }
        >
            <Head title={folder.name} />
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <UpCard link={folder.links.parent} />
                        {folders.map((folder) => (
                            <FolderCard key={folder.id} folder={folder} />
                        ))}
                        {files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                        <div className="col-span-3 flex items-center gap-3">
                            <Button
                                variant="outline"
                                onClick={() => showModal('createFile')}
                            >
                                Upload File
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => showModal('createFolder')}
                            >
                                Create Folder
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-[100vh]">
                <div className="container">
                    <pre>{JSON.stringify(folder, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
