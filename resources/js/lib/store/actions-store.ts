import { create } from 'zustand';

interface ActionsState {
    isCreatingFolder: boolean;
    showCreateFolder: () => void;
    cancelCreateFolder: () => void;
}

export const useActionsStore = create<ActionsState>((set) => ({
    isCreatingFolder: false,
    showCreateFolder: () => {
        set({ isCreatingFolder: true });
    },
    cancelCreateFolder: () => {
        set({ isCreatingFolder: false });
    },
}));
