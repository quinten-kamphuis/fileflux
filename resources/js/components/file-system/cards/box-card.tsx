import { getFoldersAndFilesCountString } from '@/lib/utils';
import { Box } from '@/types';
import { IconFile, IconFolder } from '@tabler/icons-react';
import { FileSystemCard } from './file-system-card';

type Props = {
    box: Box;
};

export const BoxCard = ({ box }: Props) => {
    return (
        <FileSystemCard
            variant="box"
            title={box.name}
            description={getFoldersAndFilesCountString(
                box.folderCount,
                box.fileCount,
            )}
            link={box.links.self}
        >
            <div className="flex justify-between gap-2">
                <p>{box.owner.name}</p>
                <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                        <IconFolder />
                        {box.folderCount}
                    </div>
                    <div className="flex items-center gap-1">
                        <IconFile />
                        {box.fileCount}
                    </div>
                </div>
            </div>
        </FileSystemCard>
    );
};
