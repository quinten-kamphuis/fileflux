import { CardWrapper } from '@/components/card-wrapper';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box } from '@/types';
import { Head } from '@inertiajs/react';
import { IconBox } from '@tabler/icons-react';

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
                                <div>
                                    <p>{box.owner.name}</p>
                                </div>
                            </CardWrapper>
                        ))}
                    </div>
                    <pre>{JSON.stringify(boxes, null, 2)}</pre>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}
