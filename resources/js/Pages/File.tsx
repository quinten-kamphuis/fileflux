import { CardWrapper } from '@/components/card-wrapper';
import { FileActions } from '@/components/file-actions';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { File } from '@/types';
import { Head } from '@inertiajs/react';
import { IconArrowLeft, IconFile } from '@tabler/icons-react';

type Props = {
    file: File;
};

export default function FilePage({ file }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <NavigationHeader
                    variant="file"
                    breadcrumbs={file.breadcrumbs}
                />
            }
        >
            <Head title={file.name} />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 gap-6">
                        <CardWrapper
                            title={
                                <div className="flex items-center gap-2">
                                    <IconArrowLeft />
                                    <span>..</span>
                                </div>
                            }
                            description="Go back up one level"
                            href={file.links.parent}
                        >
                            <div>
                                <p>Go back up one level.</p>
                            </div>
                        </CardWrapper>
                        <CardWrapper
                            key={file.id}
                            title={
                                <div className="flex items-center">
                                    <IconFile />
                                    <span className="ml-2">{file.name}</span>
                                </div>
                            }
                            description="Box content"
                        >
                            <div className="flex justify-between gap-2">
                                <p>{file.owner.name}</p>
                                <FileActions
                                    downloadLink={file.links.download}
                                    deleteLink={file.links.delete}
                                />
                            </div>
                        </CardWrapper>
                    </div>
                </div>
            </section>
            <section className="mt-[100vh]">
                <pre>{JSON.stringify(file, null, 2)}</pre>
            </section>
        </AuthenticatedLayout>
    );
}
