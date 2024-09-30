import { Input } from '@/components/ui/input';
import { SelectWrapper } from '@/components/wrappers/select-wrapper';
import { useFiltersStore } from '@/lib/store/filters-store';
import { useEffect } from 'react';

const itemTypeFilter = ['all', 'folders', 'files'];
export type ItemTypeFilter = (typeof itemTypeFilter)[number];

export const FiltersHeader = () => {
    const { searchValue, itemType, updateFilters, resetFilters } =
        useFiltersStore();

    useEffect(() => {
        return () => {
            resetFilters();
        };
    }, [resetFilters]);

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => updateFilters({ searchValue: e.target.value })}
                className="w-64"
            />
            <SelectWrapper
                items={itemTypeFilter}
                value={itemType}
                onValueChange={(value) =>
                    updateFilters({ itemType: value as ItemTypeFilter })
                }
                className="w-36"
            />
        </div>
    );
};
