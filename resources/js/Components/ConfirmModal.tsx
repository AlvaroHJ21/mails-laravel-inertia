import { createContext, useContext, useState } from "react";
import Modal from "./Modal";

interface IConfirmModal {
    title?: string;
    message?: string;
    buttonVariant?: "primary" | "error";
    buttonText?: string;
    onConfirm?(): void;
}

export const ModalConfirmContext = createContext<{
    open: boolean;
    data: IConfirmModal;
    openConfirm: (props: IConfirmModal) => void;
    cancel(): void;
}>({
    open: false,
    data: {},
    openConfirm: () => {},
    cancel: () => {},
});

export const ConfirmModalProvider = ({ children }: any) => {
    const [open, setOpen] = useState(false);

    const [data, setData] = useState<IConfirmModal>({
        title: "Confirmar",
        message: "¿Estás seguro?",
        buttonText: "Eliminar",
        buttonVariant: "error",
    });

    function openConfirm(newData: IConfirmModal = {}) {
        setOpen(true);
        setData({ ...data, ...newData });
    }

    function cancel() {
        setOpen(false);
    }

    return (
        <ModalConfirmContext.Provider
            value={{
                open,
                data,
                openConfirm,
                cancel,
            }}
        >
            {children}
            <ConfirmModal />
        </ModalConfirmContext.Provider>
    );
};

export function useConfirmModal() {
    return useContext(ModalConfirmContext);
}

export default function ConfirmModal() {
    const { open, data, cancel } = useContext(ModalConfirmContext);
    return (
        <Modal show={open} onClose={cancel} maxWidth="xs">
            <div className="p-8">
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="text-xl font-bold">
                                    {data.title}
                                </h5>
                            </div>
                            <div className="modal-body">
                                <p>{data.message}</p>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={cancel}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    className={
                                        "btn " +
                                        (data.buttonVariant === "primary"
                                            ? "btn-primary"
                                            : "btn-error")
                                    }
                                    onClick={data.onConfirm}
                                >
                                    {data.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
