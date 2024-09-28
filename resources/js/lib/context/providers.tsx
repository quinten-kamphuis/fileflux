import { ModalProvider } from './modal-provider';

type Props = {
    children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
    return <ModalProvider>{children}</ModalProvider>;
};

export default Providers;
