import { Breadcrumb } from '@/types';
import { Link } from '@inertiajs/react';

type Props = {
    breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
    {
        return breadcrumbs.map((breadcrumb, index) => (
            <span key={breadcrumb.id}>
                {index > 0 && ' / '}
                {breadcrumb.link ? (
                    <Link href={breadcrumb.link} className="hover:underline">
                        {breadcrumb.name}
                    </Link>
                ) : (
                    breadcrumb.name
                )}
            </span>
        ));
    }
};
