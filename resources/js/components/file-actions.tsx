import { Button } from '@/components/ui/button';
import { useFileSystemStore } from '@/lib/store/file-system-store';
import { router } from '@inertiajs/react';
import { IconDownload, IconTrash } from '@tabler/icons-react';

type Props = {
    downloadLink: string | null;
    deleteLink: string | null;
};

export const FileActions = ({ downloadLink, deleteLink }: Props) => {
    const { boxId, folderId } = useFileSystemStore((state) => state);

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (deleteLink) {
            router.delete(deleteLink, {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    if (folderId) {
                        router.visit(route('folders.show', folderId), {
                            only: ['folders'],
                        });
                    } else if (boxId) {
                        router.visit(route('boxes.show', boxId), {
                            only: ['folders'],
                        });
                    }
                },
            });
        }
    };

    return (
        <div className="flex items-center gap-2">
            {downloadLink && (
                <Button variant="secondary" asChild>
                    <a href={downloadLink}>
                        <IconDownload />
                    </a>
                </Button>
            )}
            {deleteLink && (
                <Button variant="secondary" onClick={handleDelete}>
                    <IconTrash />
                </Button>
            )}
        </div>
    );
};
