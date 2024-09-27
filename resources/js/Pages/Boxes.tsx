import { CardWrapper } from '@/components/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { type Box } from '@/types';
import { Head } from '@inertiajs/react';
import { IconBox, IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    boxes: Box[];
};

export default function Boxes({ boxes }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">Boxes</h2>
            }
        >
            <Head title="Dashboard" />

            <section>
                <div className="container">
                    <div className="grid grid-cols-3 gap-6">
                        {boxes.map((box) => (
                            <CardWrapper
                                key={box.id}
                                title={
                                    <div className="flex items-center">
                                        <IconBox />
                                        <p className="ml-2">{box.name}</p>
                                    </div>
                                }
                                description="Box content"
                                href={box.links.self}
                            >
                                <div className="flex justify-between gap-2">
                                    <p>{box.owner.name}</p>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1">
                                            <IconFolder />
                                            {box.folderCount}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <IconFile />
                                            {box.fileCount}
                                        </div>
                                    </div>
                                </div>
                            </CardWrapper>
                        ))}
                    </div>
                </div>
            </section>
            <section className="mt-[100vh]">
                <pre>{JSON.stringify(boxes, null, 2)}</pre>
            </section>
        </AuthenticatedLayout>
    );
}
