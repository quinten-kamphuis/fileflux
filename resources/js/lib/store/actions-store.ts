import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type UploadFile = {
    id: string;
    name: string;
    file: File;
};

interface ActionsState {
    isCreatingFolder: boolean;
    showCreateFolder: () => void;
    cancelCreateFolder: () => void;
    filesUploading: UploadFile[];
    uploadingFiles: (files: FileList | null) => void;
    removeFileUpload: (id: string) => void;
}

export const useActionsStore = create<ActionsState>((set) => ({
    isCreatingFolder: false,
    showCreateFolder: () => {
        set({ isCreatingFolder: true });
    },
    cancelCreateFolder: () => {
        set({ isCreatingFolder: false });
    },
    filesUploading: [],
    uploadingFiles: (files) => {
        if (!files) {
            return;
        }

        set({
            filesUploading: Array.from(files).map((file) => ({
                id: nanoid(),
                name: file.name,
                file,
            })),
        });
    },
    removeFileUpload: (id) => {
        set((state) => ({
            filesUploading: state.filesUploading.filter(
                (file) => file.id !== id,
            ),
        }));
    },
}));
