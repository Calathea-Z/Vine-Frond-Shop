import { XMarkIcon } from "@heroicons/react/24/solid";

function Modal({isOpen, children, onClose}) {
    if (!isOpen) return null;

    const handleBackdropClick = (event) => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={handleBackdropClick}>
            <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
                <button onClick={onClose} className="absolute -top-4 -right-4 rounded-full w-8 h-8 flex items-center justify-center text-xl bg-red-300">
                    <XMarkIcon />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal