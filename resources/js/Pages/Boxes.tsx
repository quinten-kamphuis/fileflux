import { CardWrapper } from '@/components/card-wrapper';
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
import { IconBox, IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    boxes: Box[];
    showCreateModal: boolean;
};

export default function Boxes({ boxes, showCreateModal }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2">
                    <IconBox />
                    <h2 className="text-xl font-semibold leading-tight">
                        Boxes
                    </h2>
                </div>
            }
        >
            <Head title="Boxes" />

            <section>
                <div className="container space-y-4">
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
                    <div className="flex items-center justify-center gap-2 py-16">
                        <p className="text-lg font-bold">
                            Need to create a new box?
                        </p>
                        <Button className="ml-2" variant="outline" asChild>
                            <Link href={route('boxes.create')}>Create Box</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section className="mt-[100vh]">
                <pre>{JSON.stringify(boxes, null, 2)}</pre>
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
                    <div>
                        <p>
                            A box will cost you $5 per month and will have a
                            storage limit of 5GB.
                        </p>
                        <p>
                            You can create as many boxes as you want, but you
                            will be charged $5 per month for each box.
                        </p>
                        <p>
                            You can also buy more expensive boxes with higher
                            storage limits.
                        </p>
                        <p>
                            Here are the available box sizes and their prices:
                        </p>
                        <ul>
                            <li>5GB - $5/month</li>
                            <li>10GB - $10/month</li>
                            <li>15GB - $15/month</li>
                            <li>20GB - $20/month</li>
                            <li>25GB - $25/month</li>
                        </ul>
                    </div>
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
