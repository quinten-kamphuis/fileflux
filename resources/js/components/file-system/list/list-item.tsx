import { TableCell, TableRow } from '@/components/ui/table';
import { TooltipWrapper } from '@/components/wrappers/tooltip-wrapper';
import { useFileSystemActions } from '@/lib/hooks/use-file-system-actions';
import { toSentenceCase } from '@/lib/utils';
import { FileSystemItem } from '@/types';
import { router } from '@inertiajs/react';
import { IconFile, IconFolder } from '@tabler/icons-react';

type Props = {
    item: FileSystemItem;
};

export const ListItem = ({ item }: Props) => {
    const { handleDelete } = useFileSystemActions();

    const openItemProps = {
        className: 'cursor-pointer',
        onClick: () => router.replace(item.links.self),
    };

    const handleOnClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
        e.preventDefault();
        handleDelete(item.links.delete);
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
            <TableCell
                className="cursor-pointer bg-destructive text-right text-destructive-foreground"
                onClick={handleOnClick}
            >
                Delete
            </TableCell>
        </TableRow>
    );
};
