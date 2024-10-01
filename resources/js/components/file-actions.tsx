import { Button } from '@/components/ui/button';
import { useFileSystemActions } from '@/lib/hooks/use-file-system-actions';
import { IconDownload, IconTrash } from '@tabler/icons-react';

type Props = {
    downloadLink: string | null;
    deleteLink: string | null;
};

export const FileActions = ({ downloadLink, deleteLink }: Props) => {
    const { handleDelete } = useFileSystemActions();

    const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        handleDelete(deleteLink);
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
                <Button variant="secondary" onClick={handleOnClick}>
                    <IconTrash />
                </Button>
            )}
        </div>
    );
};
