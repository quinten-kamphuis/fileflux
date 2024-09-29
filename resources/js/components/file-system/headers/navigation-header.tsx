import { Breadcrumb } from '@/types';
import { IconBox, IconFile, IconFolder } from '@tabler/icons-react';
import { Breadcrumbs } from './breadcrumbs';

type Props = {
    variant: 'box' | 'folder' | 'file';
    breadcrumbs: Breadcrumb[];
};

export const NavigationHeader = ({ variant, breadcrumbs }: Props) => {
    return (
        <div className="flex items-start gap-2">
            <div className="shrink-0">
                {variant === 'box' && <IconBox />}
                {variant === 'folder' && <IconFolder />}
                {variant === 'file' && <IconFile />}
            </div>
            <h2 className="text-xl font-semibold leading-tight">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </h2>
        </div>
    );
};
