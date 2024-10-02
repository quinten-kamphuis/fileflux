import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useActionsStore } from '@/lib/store/actions-store';
import { IconFolderPlus, IconUpload } from '@tabler/icons-react';

export const ActionsHeader = () => {
    const { isCreatingFolder, showCreateFolder, uploadingFiles } =
        useActionsStore();

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Label>
                    Upload File
                    <IconUpload size={16} />
                    <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => uploadingFiles(e.target.files)}
                    />
                </Label>
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
