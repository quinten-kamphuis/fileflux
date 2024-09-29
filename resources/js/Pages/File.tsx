import { FileActions } from '@/components/file-actions';
import { UpCard } from '@/components/file-system/cards/up-card';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
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
            header={
                <NavigationHeader
                    variant="file"
                    breadcrumbs={file.breadcrumbs}
                />
            }
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
