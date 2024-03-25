import { Fragment, PropsWithChildren } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function Modal({
    children,
    show = false,
    maxWidth = "md",
    closeable = true,
    onClose = () => {},
}: PropsWithChildren<{
    show: boolean;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
    closeable?: boolean;
    onClose: CallableFunction;
}>) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        xs: "sm:max-w-sm",
        sm: "sm:max-w-screen-sm",
        md: "sm:max-w-screen-md",
        lg: "sm:max-w-screen-lg",
        xl: "sm:max-w-screen-xl",
        "2xl": "sm:max-w-screen-2xl",
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex items-center overflow-y-auto transition-all transform sm:px-0"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black/50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`relative max-h-screen bg-white rounded-lg overflow-y-auto shadow-xl transform transition-all sm:w-[90%] sm:mx-auto ${maxWidthClass}`}
                    >
                        {closeable && (
                            <button
                                onClick={close}
                                className="absolute top-2 right-4 text-celeste-claro"
                            >
                                <i className="fa fa-x"></i>
                            </button>
                        )}
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}
