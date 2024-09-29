import { FileActions } from '@/components/file-actions';
import { formatFileSize } from '@/lib/utils';
import { FileSystemItem } from '@/types';
import { FileSystemCard } from './file-system-card';

type Props = {
    item: FileSystemItem;
};

export const FileCard = ({ item }: Props) => {
    return (
        <FileSystemCard
            variant="file"
            title={item.name}
            description={`Uploaded ${item.createdAt}`}
        >
            <div className="flex items-end justify-between gap-2">
                <FileActions
                    downloadLink={item.links.download}
                    deleteLink={item.links.delete}
                />
                <div className="flex items-center gap-2"></div>
                <p>{formatFileSize(item.size || 0)}</p>
            </div>
        </FileSystemCard>
    );
};
