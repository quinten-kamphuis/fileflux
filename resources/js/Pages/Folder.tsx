import { CardWrapper } from '@/components/card-wrapper';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import { Button } from '@/components/ui/button';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useModal } from '@/lib/context/modal-provider';
import { useSyncFilesystem } from '@/lib/hooks/use-sync-filesystem';
import { Folder } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconFile, IconFolder } from '@tabler/icons-react';

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
                        <CardWrapper
                            title={
                                <div className="flex items-center gap-2">
                                    <IconArrowLeft />
                                    <span>..</span>
                                </div>
                            }
                            description="Go back up one level"
                            href={folder.links.parent}
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
                                    <div className="flex items-center gap-2">
                                        {/* <p>{file.mime}</p> */}
                                    </div>
                                </div>
                            </CardWrapper>
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
