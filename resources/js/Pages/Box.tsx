import { FileCard } from '@/components/file-system/cards/file-card';
import { FolderCard } from '@/components/file-system/cards/folder-card';
import { UpCard } from '@/components/file-system/cards/up-card';
import { Headers } from '@/components/file-system/headers/headers';
import { CardsSection } from '@/components/file-system/layouts/cards-section';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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

    return (
        <AuthenticatedLayout
            headers={<Headers variant="box" breadcrumbs={box.breadcrumbs} />}
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
            </CardsSection>
            <section className="mt-[100vh]">
                <div className="container">
                    <pre>{JSON.stringify(box, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
