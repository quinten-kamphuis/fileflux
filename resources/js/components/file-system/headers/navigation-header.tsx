import { Breadcrumb, NavigationVariant } from '@/types';
import { IconBox, IconFile, IconFolder } from '@tabler/icons-react';
import { Breadcrumbs } from './breadcrumbs';
import { LayoutHeader } from './layout-header';

type Props = {
    variant: NavigationVariant;
    breadcrumbs: Breadcrumb[];
    showLayoutHeader?: boolean;
};

export const NavigationHeader = ({
    variant,
    breadcrumbs,
    showLayoutHeader,
}: Props) => {
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
            {showLayoutHeader && <LayoutHeader />}
        </div>
    );
};
