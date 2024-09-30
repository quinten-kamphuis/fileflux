import { Button } from '@/components/ui/button';
import { useLayoutStore } from '@/lib/store/layout-store';
import { cn } from '@/lib/utils';
import { IconLayout, IconList } from '@tabler/icons-react';

export const LayoutHeader = () => {
    const { layout, setLayout } = useLayoutStore();

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className={cn('size-8', layout === 'list' && 'bg-secondary')}
                onClick={() => setLayout('list')}
            >
                <IconList />
            </Button>
            <Button
                variant="outline"
                size="icon"
                className={cn('size-8', layout === 'grid' && 'bg-secondary')}
                onClick={() => setLayout('grid')}
            >
                <IconLayout />
            </Button>
        </div>
    );
};
