import { Breadcrumbs } from '@/components/breadcrumbs';
import { CardWrapper } from '@/components/card-wrapper';
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
                <div className="flex items-center gap-2">
                    <IconFile />
                    <h2 className="text-xl font-semibold leading-tight">
                        <Breadcrumbs breadcrumbs={file.breadcrumbs} />
                    </h2>
                </div>
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
                                    <p>..</p>
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
                                    <p className="ml-2">{file.name}</p>
                                </div>
                            }
                            description="Box content"
                        >
                            <div className="flex justify-between gap-2">
                                <p>{file.owner.name}</p>
                                <div className="flex items-center gap-2">
                                    <IconFile />
                                    <p>{file.mimeType}</p>
                                </div>
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
