import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { IconDownload, IconTrash } from '@tabler/icons-react';

type Props = {
    downloadLink: string | null;
    deleteLink: string | null;
};

export const FileActions = ({ downloadLink, deleteLink }: Props) => {
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
                <Button variant="secondary" asChild>
                    <Link href={deleteLink}>
                        <IconTrash />
                    </Link>
                </Button>
            )}
        </div>
    );
};
