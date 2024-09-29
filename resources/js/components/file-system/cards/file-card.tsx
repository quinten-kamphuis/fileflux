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
            description="File content"
            link={file.links.self}
        >
            <div className="flex justify-between gap-2">
                <p>{file.owner.name}</p>
                <div className="flex items-center gap-2">
                    <p>{file.mimeType}</p>
                </div>
            </div>
        </FileSystemCard>
    );
};
