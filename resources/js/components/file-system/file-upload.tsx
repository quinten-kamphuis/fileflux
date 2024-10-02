import { UploadFile, useActionsStore } from '@/lib/store/actions-store';
import { useFileSystemStore } from '@/lib/store/file-system-store';
import { router, useForm } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { NewFileCard } from './cards/new-file-card';
import { NewFileItem } from './list/new-file-item';

type Props = {
    file: UploadFile;
    variant: 'card' | 'list';
};
export const FileUpload = ({ file, variant }: Props) => {
    const { boxId, folderId } = useFileSystemStore();
    const { removeFileUpload } = useActionsStore();
    const [hasStartedUpload, setHasStartedUpload] = useState(false);

    const { post, errors, progress, processing, reset, hasErrors } = useForm({
        box_id: boxId,
        parent_folder_id: folderId,
        file: file.file,
    });

    const handleUploadFile = useCallback(() => {
        if (!file.file || hasStartedUpload) return;

        setHasStartedUpload(true);

        post(route('files.store'), {
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onError: () => {
                toast.error('Failed to upload file', {
                    description: errors.file,
                    dismissible: true,
                });
                setHasStartedUpload(false);
            },
            onSuccess: () => {
                removeFileUpload(file.id);
                console.log('File uploaded');
                router.visit(route(route().current() ?? '', route().params), {
                    only: ['folders'],
                });
            },
        });
    }, [file, post, errors.file, removeFileUpload, hasStartedUpload]);

    useEffect(() => {
        if (!hasStartedUpload && !processing && !hasErrors) {
            handleUploadFile();
        }
        return () => reset();
    }, [handleUploadFile, processing, hasErrors, hasStartedUpload, reset]);

    if (variant === 'card') {
        return (
            <NewFileCard
                name={file.name}
                progress={progress}
                hasErrors={hasErrors}
                onRetry={() => {
                    setHasStartedUpload(false);
                    handleUploadFile();
                }}
                onCancel={() => removeFileUpload(file.id)}
            />
        );
    } else {
        return (
            <NewFileItem
                name={file.name}
                progress={progress}
                hasErrors={hasErrors}
                onRetry={() => {
                    setHasStartedUpload(false);
                    handleUploadFile();
                }}
                onCancel={() => removeFileUpload(file.id)}
            />
        );
    }
};
