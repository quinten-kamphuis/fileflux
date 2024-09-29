import { FileActions } from '@/components/file-actions';
import { UpCard } from '@/components/file-system/cards/up-card';
import { Headers } from '@/components/file-system/headers/headers';
import { CardsSection } from '@/components/file-system/layouts/cards-section';
import { CardWrapper } from '@/components/wrappers/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { File } from '@/types';
import { Head } from '@inertiajs/react';
import { IconFile } from '@tabler/icons-react';

type Props = {
    file: File;
};

export default function FilePage({ file }: Props) {
    return (
        <AuthenticatedLayout
            headers={<Headers variant="file" breadcrumbs={file.breadcrumbs} />}
        >
            <Head title={file.name} />
            <CardsSection>
                <UpCard link={file.links.parent} />
                <CardWrapper
                    key={file.id}
                    title={
                        <div className="flex items-center">
                            <IconFile />
                            <span className="ml-2">{file.name}</span>
                        </div>
                    }
                    description="Box content"
                    className="col-span-3"
                >
                    <div className="flex justify-between gap-2">
                        <p>{file.owner.name}</p>
                        <FileActions
                            downloadLink={file.links.download}
                            deleteLink={file.links.delete}
                        />
                    </div>
                </CardWrapper>
            </CardsSection>
            <section className="mt-[100vh]">
                <pre>{JSON.stringify(file, null, 2)}</pre>
            </section>
        </AuthenticatedLayout>
    );
}
