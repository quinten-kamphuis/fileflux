import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';

type Props = {
    children: React.ReactNode;
    title?: React.ReactNode | string;
    description?: React.ReactNode | string;
    href?: string;
    className?: string;
};

export const CardWrapper = ({
    children,
    title,
    description,
    href,
    className,
}: Props) => {
    return (
        <LinkWrapper href={href}>
            <Card className={className}>
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </LinkWrapper>
    );
};

const LinkWrapper = ({ children, href }: Props) =>
    href ? (
        <Link href={href} draggable={false}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    );
