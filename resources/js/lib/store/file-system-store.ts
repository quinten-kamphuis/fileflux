import { create } from 'zustand';

interface FileSystemState {
    folderId: string | null;
    boxId: string | null;
    updateFileSystem: (
        updates: Partial<
            Omit<FileSystemState, 'syncWithInertia' | 'updateFileSystem'>
        >,
    ) => void;
}

export const useFileSystemStore = create<FileSystemState>((set) => ({
    folderId: null,
    boxId: null,
    updateFileSystem: (updates) => set((state) => ({ ...state, ...updates })),
}));
