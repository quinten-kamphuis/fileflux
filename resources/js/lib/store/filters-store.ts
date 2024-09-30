import { ItemTypeFilter } from '@/components/file-system/headers/filters-header';
import { create } from 'zustand';

interface FiltersState {
    searchValue: string;
    itemType: ItemTypeFilter;
    updateFilters: (
        updates: Partial<Omit<FiltersState, 'updateFilters'>>,
    ) => void;
    resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
    searchValue: '',
    itemType: 'all',
    updateFilters: (updates) => set((state) => ({ ...state, ...updates })),
    resetFilters: () => set({ searchValue: '', itemType: 'all' }),
}));
