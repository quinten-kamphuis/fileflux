import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';

import CreateFolderForm from '@/components/forms/create-folder-form';
import UploadFileForm from '@/components/forms/upload-file-form';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type ModalContextType = {
    showModal: (modalName: ModalType) => void;
    closeModals: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

const modals = ['createFile', 'createFolder'] as const;
type ModalType = (typeof modals)[number];

const modalsFalseObject = Object.fromEntries(
    modals.map((modal) => [modal, false]),
) as Record<ModalType, boolean>;

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [openModals, setOpenModals] =
        useState<typeof modalsFalseObject>(modalsFalseObject);

    const openModal = useCallback((modalName: ModalType) => {
        setOpenModals((prev) => ({ ...prev, [modalName]: true }));
    }, []);

    const closeModal = () => setOpenModals(modalsFalseObject);

    const isModalOpen = Object.keys(openModals).some(
        (key) => openModals[key as ModalType],
    );

    return (
        <ModalContext.Provider
            value={{ showModal: openModal, closeModals: closeModal }}
        >
            <Dialog
                open={isModalOpen}
                onOpenChange={isModalOpen ? closeModal : undefined}
            >
                {children}
                <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-clip sm:max-w-[425px]">
                    {openModals.createFile && <UploadFileForm />}
                    {openModals.createFolder && <CreateFolderForm />}
                </DialogContent>
            </Dialog>
        </ModalContext.Provider>
    );
};
