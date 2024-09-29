import { FileCard } from '@/components/file-system/cards/file-card';
import { FolderCard } from '@/components/file-system/cards/folder-card';
import { UpCard } from '@/components/file-system/cards/up-card';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useModal } from '@/lib/context/modal-provider';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { Box } from '@/types';
import { Head } from '@inertiajs/react';

type Props = {
    box: Box;
};

export default function BoxPage({ box }: Props) {
    useSyncFilesystem({
        boxId: box.id,
    });

    const { folders, files } = box;

    const { showModal } = useModal();

    return (
        <AuthenticatedLayout
            header={
                <NavigationHeader variant="box" breadcrumbs={box.breadcrumbs} />
            }
        >
            <Head title={box.name} />
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <UpCard link={route('boxes.index')} />
                        {folders.map((folder) => (
                            <FolderCard key={folder.id} folder={folder} />
                        ))}
                        {files.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                    <div className="mt-8 flex flex-col items-start gap-4">
                        <Button
                            className="mt-8"
                            variant="outline"
                            onClick={() => showModal('createFile')}
                        >
                            Upload File
                        </Button>
                        <Button
                            className="mt-4"
                            variant="outline"
                            onClick={() => showModal('createFolder')}
                        >
                            Create Folder
                        </Button>
                    </div>
                </div>
            </section>
            <section className="mt-[100vh]">
                <div className="container">
                    <pre>{JSON.stringify(box, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
