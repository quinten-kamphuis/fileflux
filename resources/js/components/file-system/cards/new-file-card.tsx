import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AxiosProgressEvent } from 'axios';
import { FileSystemCard } from './file-system-card';

type Props = {
    name: string;
    progress: AxiosProgressEvent | null;
    hasErrors: boolean;
    onRetry: () => void;
    onCancel: () => void;
};

export const NewFileCard = ({
    name,
    progress,
    hasErrors,
    onRetry,
    onCancel,
}: Props) => {
    if (hasErrors) {
        return (
            <FileSystemCard
                variant="file"
                title={name}
                description="Failed to upload"
            >
                <div className="flex items-end justify-end gap-2">
                    <Button variant="outline" onClick={onRetry}>
                        Retry
                    </Button>
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </FileSystemCard>
        );
    }
    return (
        <FileSystemCard variant="file" title={name} description="Uploading...">
            <div className="flex items-end justify-between gap-2">
                {progress && <Progress value={progress.percentage} />}
            </div>
        </FileSystemCard>
    );
};
