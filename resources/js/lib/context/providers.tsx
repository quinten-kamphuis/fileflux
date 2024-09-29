import { TooltipProvider } from '@/components/ui/tooltip';
import { ModalProvider } from './modal-provider';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return (
        <ModalProvider>
            <TooltipProvider>{children}</TooltipProvider>
        </ModalProvider>
    );
};

export default Providers;
