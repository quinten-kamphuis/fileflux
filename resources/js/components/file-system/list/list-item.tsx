import { TableCell, TableRow } from '@/components/ui/table';
import { FileSystemItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    item: FileSystemItem;
};

const ListItem = ({ item }: Props) => {
    return (
        <TableRow
            key={item.id}
            onClick={() => router.replace(item.links.self)}
            className="cursor-pointer"
        >
            <TableCell>
                {item.type === 'folder' && <IconFolder />}
                {item.type === 'file' && <IconFile />}
                <span className="sr-only">
                    {item.type === 'folder' ? 'Folder' : 'File'}
                </span>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell className="text-right">
                <Link href={item.links.delete ?? '#'} className="text-red-500">
                    Delete
                </Link>
            </TableCell>
        </TableRow>
    );
};

export default ListItem;
