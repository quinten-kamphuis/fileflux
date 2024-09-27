import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardWrapper } from '@/components/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Folder } from '@/types';
import { Head } from '@inertiajs/react';
import { IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    folder: Folder;
};

export default function FolderPage({ folder }: Props) {
    const { folders, files } = folder;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <IconFolder />
                    <h2 className="text-xl font-semibold leading-tight">
                        <Breadcrumbs breadcrumbs={folder.breadcrumbs} />
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />
            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        {folders.map((folder) => (
                            <CardWrapper
                                key={folder.id}
                                title={
                                    <div className="flex items-center">
                                        <IconFolder />
                                        <p className="ml-2">{folder.name}</p>
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
                                        <p className="ml-2">{file.name}</p>
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
