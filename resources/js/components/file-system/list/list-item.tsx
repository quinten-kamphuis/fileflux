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
    const openItemProps = {
        className: 'cursor-pointer',
        onClick: () => router.replace(item.links.self),
    };
    return (
        <TableRow key={item.id}>
            <TableCell {...openItemProps}>
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
            <TableCell {...openItemProps}>
                {item.type === 'file' && (
                    <TooltipWrapper>{item.createdAt}</TooltipWrapper>
                )}
            </TableCell>
            <TableCell className="text-right">
                <Link href={item.links.delete ?? '#'} className="text-red-500">
                    Delete
                </Link>
            </TableCell>
        </TableRow>
    );
};
