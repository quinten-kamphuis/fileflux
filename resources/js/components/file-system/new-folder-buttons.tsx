import { IconCheck, IconX } from '@tabler/icons-react';
import { Button } from '../ui/button';

type Props = {
    className?: string;
    cancelCreateFolder: () => void;
    handleCreateFolder: () => void;
    cancelDisabled: boolean;
    confirmDisabled: boolean;
};

export const NewFolderButtons = ({
    className,
    cancelCreateFolder,
    handleCreateFolder,
    cancelDisabled,
    confirmDisabled,
}: Props) => {
    return (
        <>
            <Button
                className={className}
                onClick={cancelCreateFolder}
                disabled={cancelDisabled}
                size="icon"
                variant="outline"
            >
                <IconX />
            </Button>
            <Button
                className={className}
                onClick={handleCreateFolder}
                disabled={confirmDisabled}
                size="icon"
                variant="outline"
            >
                <IconCheck />
            </Button>
        </>
    );
};
