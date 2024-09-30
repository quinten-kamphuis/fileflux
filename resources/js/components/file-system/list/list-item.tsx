import { TableCell, TableRow } from '@/components/ui/table';
import { TooltipWrapper } from '@/components/wrappers/tooltip-wrapper';
import { toSentenceCase } from '@/lib/utils';
import { FileSystemItem } from '@/types';
import { Link, router } from '@inertiajs/react';
import { IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    item: FileSystemItem;
};

export const ListItem = ({ item }: Props) => {
    return (
        <TableRow
            key={item.id}
            onClick={() => router.replace(item.links.self)}
            className="cursor-pointer"
        >
            <TableCell>
                <TooltipWrapper content={toSentenceCase(item.type)}>
                    <div>
                        {item.type === 'folder' && <IconFolder />}
                        {item.type === 'file' && <IconFile />}
                        <span className="sr-only">Folder</span>
                    </div>
                </TooltipWrapper>
            </TableCell>
            <TableCell className="max-w-96 truncate">
                <TooltipWrapper content={item.name}>
                    <span>
                        {item.type === 'folder' && '/ '}
                        {item.name}
                    </span>
                </TooltipWrapper>
            </TableCell>
            <TableCell>
                <TooltipWrapper>{item.createdAt}</TooltipWrapper>
            </TableCell>
            <TableCell className="text-right">
                <Link href={item.links.delete ?? '#'} className="text-red-500">
                    Delete
                </Link>
            </TableCell>
        </TableRow>
    );
};
