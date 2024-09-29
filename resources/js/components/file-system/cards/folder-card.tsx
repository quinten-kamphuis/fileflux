import { getFoldersAndFilesCountString } from '@/lib/utils';
import { FileSystemItem } from '@/types';
import { IconFile, IconFolder } from '@tabler/icons-react';
import { FileSystemCard } from './file-system-card';

type Props = {
    item: FileSystemItem;
};

export const FolderCard = ({ item }: Props) => {
    return (
        <FileSystemCard
            variant="folder"
            title={item.name}
            description={getFoldersAndFilesCountString(
                item.folderCount || 0,
                item.fileCount || 0,
            )}
            link={item.links.self}
        >
            <div className="flex justify-end">
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <IconFolder />
                        {item.folderCount}
                    </div>
                    <div className="flex items-center gap-1">
                        <IconFile />
                        {item.fileCount}
                    </div>
                </div>
            </div>
        </FileSystemCard>
    );
};
