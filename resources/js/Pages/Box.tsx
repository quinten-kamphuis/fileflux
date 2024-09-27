import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardWrapper } from '@/components/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box } from '@/types';
import { Head } from '@inertiajs/react';
import { IconBox, IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    box: Box;
};

export default function BoxPage({ box }: Props) {
    const { folders, files } = box;

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
            <section className="mt-96">
                <div className="container">
                    <pre>{JSON.stringify(box, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
