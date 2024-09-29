import { FileActions } from '@/components/file-actions';
import { formatFileSize } from '@/lib/utils';
import { File } from '@/types';
import { FileSystemCard } from './file-system-card';

type Props = {
    file: File;
};

export const FileCard = ({ file }: Props) => {
    return (
        <FileSystemCard
            variant="file"
            title={file.name}
            description={`Uploaded ${file.createdAt}`}
        >
            <div className="flex items-end justify-between gap-2">
                <FileActions
                    downloadLink={file.links.download}
                    deleteLink={file.links.delete}
                />
                <div className="flex items-center gap-2"></div>
                <p>{formatFileSize(file.size || 0)}</p>
            </div>
        </FileSystemCard>
    );
};
