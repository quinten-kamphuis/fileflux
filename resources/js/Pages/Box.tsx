import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardWrapper } from '@/components/card-wrapper';
import { FileActions } from '@/components/file-actions';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useModal } from '@/lib/context/modal-provider';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { Box } from '@/types';
import { Head } from '@inertiajs/react';
import {
    IconArrowLeft,
    IconBox,
    IconFile,
    IconFolder,
} from '@tabler/icons-react';

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
                <div className="flex items-center gap-2">
                    <IconBox />
                    <h2 className="text-xl font-semibold leading-tight">
                        <Breadcrumbs breadcrumbs={box.breadcrumbs} />
                    </h2>
                </div>
            }
        >
            <Head title={box.name} />
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        <CardWrapper
                            title={
                                <div className="flex items-center gap-2">
                                    <IconArrowLeft />
                                    <span>..</span>
                                </div>
                            }
                            description="Go back up one level"
                            href={route('boxes.index')}
                        >
                            <div>
                                <p>Go back up one level.</p>
                            </div>
                        </CardWrapper>
                        {folders.map((folder) => (
                            <CardWrapper
                                key={folder.id}
                                title={
                                    <div className="flex items-center">
                                        <IconFolder />
                                        <span className="ml-2">
                                            {folder.name}
                                        </span>
                                    </div>
                                }
                                description="Box content"
                                href={folder.links.self}
                            >
                                <div className="flex justify-between gap-2">
                                    <p>{folder.owner.name}</p>
                                    <div className="flex items-center gap-2">
                                        <IconFolder />
                                        <p>{folder.folderCount}</p>
                                    </div>
                                </div>
                            </CardWrapper>
                        ))}
                        {files.map((file) => (
                            <CardWrapper
                                key={file.id}
                                title={
                                    <div className="flex items-center">
                                        <IconFile />
                                        <span className="ml-2">
                                            {file.name}
                                        </span>
                                    </div>
                                }
                                description="File content"
                                href={file.links.self}
                            >
                                <div className="flex justify-between gap-2">
                                    <p>{file.owner.name}</p>
                                    <FileActions
                                        downloadLink={file.links.download}
                                        deleteLink={file.links.delete}
                                    />
                                </div>
                            </CardWrapper>
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
