import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from './modal-provider';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <ModalProvider>
            <TooltipProvider>
                {children}
                <Toaster position="top-center" />
            </TooltipProvider>
        </ModalProvider>
    );
};

export default Providers;
