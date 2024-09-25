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
};

export const CardWrapper = ({ children, title, description, href }: Props) => {
    return (
        <LinkWrapper href={href}>
            <Card>
                <CardHeader>
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent>
                    <p>{children}</p>
                </CardContent>
            </Card>
        </LinkWrapper>
    );
};

const LinkWrapper = ({ children, href }: Props) =>
    href ? <Link href={href}>{children}</Link> : <>{children}</>;
