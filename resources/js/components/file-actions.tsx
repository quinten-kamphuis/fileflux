import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { IconDownload, IconTrash } from '@tabler/icons-react';

type Props = {
    downloadLink: string;
    deleteLink: string;
};

export const FileActions = ({ downloadLink, deleteLink }: Props) => {
    return (
        <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>
                <a href={downloadLink}>
                    <IconDownload />
                </a>
            </Button>
            <Button variant="secondary" asChild>
                <Link href={deleteLink}>
                    <IconTrash />
                </Link>
            </Button>
        </div>
    );
};
