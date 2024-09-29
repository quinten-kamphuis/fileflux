import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectWrapper } from '@/components/wrappers/select-wrapper';

export const FiltersHeader = () => {
    return (
        <div className="flex items-center gap-2">
            <Input placeholder="Search" />
            <SelectWrapper
                items={['All', 'Folders', 'Files']}
                placeholder="All"
            />
            <Button variant="outline">Filter</Button>
        </div>
    );
};
