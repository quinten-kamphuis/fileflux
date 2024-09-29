import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
    children: React.ReactNode;
    content: string;
    delay?: number;
};

export const TooltipWrapper = ({ children, content, delay = 300 }: Props) => {
    return (
        <Tooltip delayDuration={delay}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    );
};
