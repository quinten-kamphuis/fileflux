import { getFoldersAndFilesCountString } from '@/lib/utils';
import { Folder } from '@/types';
import { IconFile, IconFolder } from '@tabler/icons-react';
import { FileSystemCard } from './file-system-card';

type Props = {
    folder: Folder;
};

export const FolderCard = ({ folder }: Props) => {
    return (
        <FileSystemCard
            variant="folder"
            title={folder.name}
            description={getFoldersAndFilesCountString(
                folder.folderCount,
                folder.fileCount,
            )}
            link={folder.links.self}
        >
            <div className="flex justify-end">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <IconFolder />
                        {folder.folderCount}
                    </div>
                    <div className="flex items-center gap-1">
                        <IconFile />
                        {folder.fileCount}
                    </div>
                </div>
            </div>
        </FileSystemCard>
    );
};
