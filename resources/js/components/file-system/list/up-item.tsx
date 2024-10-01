import { TableCell, TableRow } from '@/components/ui/table';
import { router } from '@inertiajs/react';
import { IconArrowLeft } from '@tabler/icons-react';

type Props = {
    upLink: string;
};

export const UpItem = ({ upLink }: Props) => {
    return (
        <TableRow
            onClick={() => router.replace(upLink)}
            className="cursor-pointer"
        >
            <TableCell>
                <IconArrowLeft />
            </TableCell>
            <TableCell colSpan={3}>Go up</TableCell>
        </TableRow>
    );
};
