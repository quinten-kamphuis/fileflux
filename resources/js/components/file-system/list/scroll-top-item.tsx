import { TableCell, TableRow } from '@/components/ui/table';
import { IconArrowUp } from '@tabler/icons-react';

export const ScrollTopItem = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <TableRow>
            <TableCell
                colSpan={4}
                className="cursor-pointer underline-offset-4 hover:underline"
                onClick={() => scrollToTop()}
            >
                <div className="flex items-center justify-center gap-2">
                    Scroll back to top
                    <IconArrowUp />
                </div>
            </TableCell>
        </TableRow>
    );
};
