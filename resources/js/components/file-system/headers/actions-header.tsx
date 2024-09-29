import { Button } from '@/components/ui/button';
import { useModal } from '@/lib/context/modal-provider';

export const ActionsHeader = () => {
    const { showModal } = useModal();
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => showModal('createFile')}>
                Upload File
            </Button>
            <Button variant="outline" onClick={() => showModal('createFolder')}>
                Create Folder
            </Button>
        </div>
    );
};
