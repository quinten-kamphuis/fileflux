import { Breadcrumb } from '@/types';
import { Link } from '@inertiajs/react';
import React from 'react';

type Props = {
    breadcrumbs: Breadcrumb[];
};

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
    return (
        <h2 className="flex flex-wrap items-center break-words text-xl font-semibold leading-tight">
            {breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={breadcrumb.id}>
                    {index > 0 && <span className="mx-2 flex-shrink-0">/</span>}
                    <span className="inline-block max-w-[200px] truncate align-bottom">
                        {breadcrumb.link ? (
                            <Link
                                href={breadcrumb.link}
                                className="hover:underline"
                            >
                                {breadcrumb.name}
                            </Link>
                        ) : (
                            breadcrumb.name
                        )}
                    </span>
                </React.Fragment>
            ))}
        </h2>
    );
};
