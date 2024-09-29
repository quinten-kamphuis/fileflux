import { Folder } from '@/types';
import { IconFolder } from '@tabler/icons-react';
import { FileSystemCard } from './file-system-card';

type Props = {
    folder: Folder;
};

export const FolderCard = ({ folder }: Props) => {
    return (
        <FileSystemCard
            variant="folder"
            title={folder.name}
            description="Box content"
            link={folder.links.self}
        >
            <div className="flex justify-between gap-2">
                <p>{folder.owner.name}</p>
                <div className="flex items-center gap-2">
                    <IconFolder />
                    <p>{folder.folderCount}</p>
                </div>
            </div>
        </FileSystemCard>
    );
};
