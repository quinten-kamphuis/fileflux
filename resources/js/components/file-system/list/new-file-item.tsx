import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TableCell, TableRow } from '@/components/ui/table';
import { TooltipWrapper } from '@/components/wrappers/tooltip-wrapper';
import {
    IconExclamationCircleFilled,
    IconFile,
    IconReload,
    IconX,
} from '@tabler/icons-react';
import { AxiosProgressEvent } from 'axios';

type Props = {
    name: string;
    progress: AxiosProgressEvent | null;
    hasErrors: boolean;
    onRetry: () => void;
    onCancel: () => void;
};

export const NewFileItem = ({
    name,
    progress,
    hasErrors,
    onRetry,
    onCancel,
}: Props) => {
    if (hasErrors) {
        return (
            <TableRow>
                <TableCell>
                    <TooltipWrapper content="Failed to upload">
                        <IconExclamationCircleFilled />
                    </TooltipWrapper>
                </TableCell>
                <TableCell>
                    <TooltipWrapper content="Failed to upload">
                        <span className="line-through">{name}</span>
                    </TooltipWrapper>
                </TableCell>
                <TableCell colSpan={2} className="p-1">
                    <div className="flex items-center justify-end gap-2">
                        <TooltipWrapper content="Retry">
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                                onClick={onRetry}
                            >
                                <IconReload />
                                <span className="sr-only">Retry</span>
                            </Button>
                        </TooltipWrapper>
                        <TooltipWrapper content="Cancel">
                            <Button
                                variant="outline"
                                size="icon"
                                className="size-8"
                                onClick={onCancel}
                            >
                                <IconX />
                                <span className="sr-only">Cancel</span>
                            </Button>
                        </TooltipWrapper>
                    </div>
                </TableCell>
            </TableRow>
        );
    }
    return (
        <TableRow>
            <TableCell>
                <IconFile />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell colSpan={2} className="p-0">
                {progress && <Progress value={progress.percentage} />}
            </TableCell>
        </TableRow>
    );
};
