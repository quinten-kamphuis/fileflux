import { router } from '@inertiajs/react';
import { useCallback } from 'react';
import { useFileSystemStore } from '../store/file-system-store';

export const useFileSystemActions = () => {
    const { boxId, folderId } = useFileSystemStore((state) => state);

    const visitParent = useCallback(() => {
        if (folderId) {
            router.visit(route('folders.show', folderId), {
                only: ['folders'],
            });
        } else if (boxId) {
            router.visit(route('boxes.show', boxId), {
                only: ['folders'],
            });
        }
    }, [boxId, folderId]);

    const handleDelete = useCallback(
        (deleteLink: string | null) => {
            if (deleteLink) {
                router.delete(deleteLink, {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        visitParent();
                    },
                });
            }
        },
        [visitParent],
    );

    return { handleDelete };
};
