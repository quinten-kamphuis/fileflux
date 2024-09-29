import { CardWrapper } from '@/components/card-wrapper';
import {
    IconArrowLeft,
    IconBox,
    IconFile,
    IconFolder,
} from '@tabler/icons-react';

type Props = {
    variant: 'file' | 'folder' | 'box' | 'up';
    title: string;
    description: string;
    link: string;
    children: React.ReactNode;
};

export const FileSystemCard = ({
    variant,
    title,
    description,
    link,
    children,
}: Props) => {
    return (
        <CardWrapper
            title={
                <div className="flex items-center gap-2">
                    {variant === 'file' && <IconFile />}
                    {variant === 'folder' && <IconFolder />}
                    {variant === 'box' && <IconBox />}
                    {variant === 'up' && <IconArrowLeft />}

                    <span>{title}</span>
                </div>
            }
            description={description}
            href={link}
        >
            {children}
        </CardWrapper>
    );
};
