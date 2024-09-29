import { Button } from '@/components/ui/button';
import { Breadcrumb, NavigationVariant } from '@/types';
import {
    IconBox,
    IconFile,
    IconFolder,
    IconLayout,
    IconList,
} from '@tabler/icons-react';
import { Breadcrumbs } from './breadcrumbs';

type Props = {
    variant: NavigationVariant;
    breadcrumbs: Breadcrumb[];
};

export const NavigationHeader = ({ variant, breadcrumbs }: Props) => {
    return (
        <div className="flex w-full items-start justify-between gap-8">
            <div className="flex items-start gap-2">
                <div className="shrink-0">
                    {variant === 'box' && <IconBox />}
                    {variant === 'folder' && <IconFolder />}
                    {variant === 'file' && <IconFile />}
                </div>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="size-8">
                    <IconList />
                </Button>
                <Button variant="outline" size="icon" className="size-8">
                    <IconLayout />
                </Button>
            </div>
        </div>
    );
};
