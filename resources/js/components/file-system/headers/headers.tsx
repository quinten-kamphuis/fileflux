import { Breadcrumb, NavigationVariant } from '@/types';
import { ActionsHeader } from './actions-header';
import { FiltersHeader } from './filters-header';
import { NavigationHeader } from './navigation-header';

type Props = {
    variant: NavigationVariant;
    breadcrumbs: Breadcrumb[];
};

export const Headers = ({ variant, breadcrumbs }: Props) => {
    return (
        <header className="py-2">
            <div className="container flex items-center gap-2 py-2">
                <NavigationHeader
                    variant={variant}
                    breadcrumbs={breadcrumbs}
                    showLayoutHeader
                />
            </div>
            <div className="container flex flex-col justify-between gap-2 py-2 md:flex-row md:items-center">
                <FiltersHeader />
                <ActionsHeader />
            </div>
        </header>
    );
};
