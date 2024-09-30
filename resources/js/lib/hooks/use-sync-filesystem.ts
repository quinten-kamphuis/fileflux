import { useEffect } from 'react';
import { useFileSystemStore } from '../store/file-system-store';

type Props = {
    folderId?: string;
    boxId?: string;
};

export const useSyncFilesystem = ({ folderId, boxId }: Props) => {
    const updateFileSystem = useFileSystemStore(
        (state) => state.updateFileSystem,
    );

    useEffect(() => {
        updateFileSystem({
            folderId,
            boxId,
        });
    }, [updateFileSystem, folderId, boxId]);
};
