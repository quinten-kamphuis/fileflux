import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { useActionsStore } from '@/lib/store/actions-store';
import { useFileSystemStore } from '@/lib/store/file-system-store';
import { router, useForm } from '@inertiajs/react';
import { IconCheck, IconFolder, IconX } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';

export const NewFolderItem = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { boxId, folderId } = useFileSystemStore((state) => state);

    const { cancelCreateFolder } = useActionsStore();

    const { data, setData, post, errors, processing } = useForm({
        box_id: boxId,
        parent_folder_id: folderId,
        name: '',
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            cancelCreateFolder();
        } else if (e.key === 'Enter') {
            handleCreateFolder();
        }
    };

    const handleCreateFolder = () => {
        if (!data.name) {
            cancelCreateFolder();
        } else if (!processing) {
            post(route('folders.store'), {
                preserveScroll: true,
                preserveState: true,
                onError: () => {
                    console.log(errors);
                    toast('Failed to create folder', {
                        description: errors.name,
                        dismissible: true,
                    });
                    inputRef.current?.focus();
                },
                onSuccess: () => {
                    router.visit(
                        route(route().current() ?? '', route().params),
                        {
                            only: ['folders'],
                        },
                    );
                    cancelCreateFolder();
                },
            });
        }
    };

    return (
        <TableRow>
            <TableCell>
                <IconFolder />
            </TableCell>
            <TableCell colSpan={2} className="p-0">
                <Input
                    placeholder="New folder name"
                    className="w-full"
                    autoFocus
                    onFocus={scrollToTop}
                    value={data.name}
                    ref={inputRef}
                    onChange={(e) => setData('name', e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={(e) => e.target.focus()}
                />
            </TableCell>
            <TableCell className="flex items-center justify-center gap-2">
                <IconX
                    className="cursor-pointer"
                    onClick={cancelCreateFolder}
                />
                <IconCheck
                    className={
                        !data.name ? 'text-muted-foreground' : 'cursor-pointer'
                    }
                    onClick={handleCreateFolder}
                />
            </TableCell>
        </TableRow>
    );
};
