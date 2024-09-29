import { FileCard } from '@/components/file-system/cards/file-card';
import { FolderCard } from '@/components/file-system/cards/folder-card';
import { UpCard } from '@/components/file-system/cards/up-card';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import { CardsSection } from '@/components/file-system/layouts/cards-section';
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
            <CardsSection>
                <UpCard link={route('boxes.index')} />
                {folders.map((folder) => (
                    <FolderCard key={folder.id} folder={folder} />
                ))}
                {files.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
                <div className="col-span-3 flex items-start gap-4">
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
            </CardsSection>
            <section className="mt-[100vh]">
                <div className="container">
                    <pre>{JSON.stringify(box, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
