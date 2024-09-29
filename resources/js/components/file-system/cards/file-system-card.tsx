import { CardWrapper } from '@/components/wrappers/card-wrapper';
import { TooltipWrapper } from '@/components/wrappers/tooltip-wrapper';
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
    link?: string;
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
                    <div className="size-6 shrink-0">
                        {variant === 'file' && <IconFile />}
                        {variant === 'folder' && <IconFolder />}
                        {variant === 'box' && <IconBox />}
                        {variant === 'up' && <IconArrowLeft />}
                    </div>
                    <TooltipWrapper content={title}>
                        <span className="truncate">{title}</span>
                    </TooltipWrapper>
                </div>
            }
            description={description}
            href={link}
            className="flex h-48 flex-col justify-between"
        >
            {children}
        </CardWrapper>
    );
};
