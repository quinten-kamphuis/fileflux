import { Input } from '@/components/ui/input';
import { CardWrapper } from '@/components/wrappers/card-wrapper';
import { useActionsStore } from '@/lib/store/actions-store';
import { useFileSystemStore } from '@/lib/store/file-system-store';
import { scrollToTop } from '@/lib/utils';
import { router, useForm } from '@inertiajs/react';
import { IconFolder } from '@tabler/icons-react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { NewFolderButtons } from '../new-folder-buttons';

export const NewFolderCard = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { boxId, folderId } = useFileSystemStore((state) => state);

    const { cancelCreateFolder } = useActionsStore();

    const { data, setData, post, errors, processing } = useForm({
        box_id: boxId,
        parent_folder_id: folderId,
        name: '',
    });

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
        <CardWrapper
            title={
                <div className="flex items-start gap-2">
                    <div className="size-6 shrink-0">
                        <IconFolder />
                    </div>
                    <Input
                        className="-mt-2 ml-2 w-full"
                        placeholder="Folder name"
                        autoFocus={true}
                        onBlur={(e) => e.target.focus()}
                        onFocus={scrollToTop}
                        onKeyDown={handleKeyDown}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>
            }
            description="Create a new folder"
            className="flex h-48 flex-col justify-between"
        >
            <div className="flex justify-end gap-2">
                <NewFolderButtons
                    cancelCreateFolder={cancelCreateFolder}
                    handleCreateFolder={handleCreateFolder}
                    cancelDisabled={processing}
                    confirmDisabled={!data.name || processing}
                />
            </div>
        </CardWrapper>
    );
};
