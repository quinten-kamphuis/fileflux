import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
    children: React.ReactNode;
    content?: string;
    delay?: number;
};

export const TooltipWrapper = ({ children, content, delay = 300 }: Props) => {
    if (content === undefined) {
        console.log(content);
        console.log(children);
        if (typeof children !== 'string') {
            throw new Error(
                'TooltipWrapper: You must provide a content prop when children is not a string',
            );
        }
        return (
            <Tooltip delayDuration={delay}>
                <TooltipTrigger asChild>
                    <span>{children}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{children}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return (
        <Tooltip delayDuration={delay}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    );
};
