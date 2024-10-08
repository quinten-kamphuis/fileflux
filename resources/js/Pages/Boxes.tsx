import { BoxCard } from '@/components/file-system/cards/box-card';
import { CardsGrid } from '@/components/file-system/cards/cards-grid';
import { NavigationHeader } from '@/components/file-system/headers/navigation-header';
import { CreateBoxForm } from '@/components/forms/create-box-form';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { type Box } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

type Props = {
    boxes: Box[];
    showCreateModal: boolean;
};

export default function Boxes({ boxes, showCreateModal }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <NavigationHeader
                    variant="box"
                    breadcrumbs={[{ id: '1', name: 'Boxes' }]}
                />
            }
        >
            <Head title="Boxes" />

            <section>
                <CardsGrid>
                    {boxes.map((box) => (
                        <BoxCard key={box.id} box={box} />
                    ))}
                </CardsGrid>
                <div className="flex items-center justify-center gap-2 py-16">
                    <p className="text-lg font-bold">
                        Need to create a new box?
                    </p>
                    <Button className="ml-2" variant="outline" asChild>
                        <Link href={route('boxes.create')}>Create Box</Link>
                    </Button>
                </div>
            </section>

            <Dialog
                defaultOpen={showCreateModal}
                onOpenChange={() => {
                    router.visit(route('boxes.index'));
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a new box</DialogTitle>
                        <DialogDescription>
                            Create a new box to store your files.
                        </DialogDescription>
                    </DialogHeader>

                    <CreateBoxForm />

                    <DialogFooter>
                        <Button variant="outline" asChild>
                            <Link href={route('boxes.create')}>Create Box</Link>
                        </Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
