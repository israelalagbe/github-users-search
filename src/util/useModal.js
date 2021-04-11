import { useState } from 'react';
/**
 *
 * @param initialMode The default state of the modal, true means the modal is open,
 * and false means it is closed by default
 */
function useModal(initialMode = false, initialData) {
    const [isOpen, setModalOpen] = useState(initialMode);
    const [modalData, setModalData] = useState(initialData);
    /**
     * Toggle between show and hide
     */
    const toggle = (data) => {
        if (data)
            setModalData(data);
        setModalOpen(!isOpen);
    };
    /**
     * Show the modal
     */
    const open = (data) => {
        if (data)
            setModalData(data);
        setModalOpen(true);
    };
    /**
     * Hide the modal
     */
    const close = () => {
        setModalOpen(false);
    };
    return {
        modalData,
        isOpen,
        open,
        close,
        toggle,
    };
}
export default useModal;
