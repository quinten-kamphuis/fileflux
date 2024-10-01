import { Button } from '@/components/ui/button';
import { useModal } from '@/lib/context/modal-provider';
import { useActionsStore } from '@/lib/store/actions-store';
import { IconFolderPlus, IconUpload } from '@tabler/icons-react';

export const ActionsHeader = () => {
    const { showModal } = useModal();
    const { isCreatingFolder, showCreateFolder } = useActionsStore();

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => showModal('createFile')}>
                Upload File
                <IconUpload size={16} />
            </Button>
            <Button
                variant="outline"
                disabled={isCreatingFolder}
                onClick={showCreateFolder}
            >
                Create Folder
                <IconFolderPlus size={16} />
            </Button>
        </div>
    );
};
