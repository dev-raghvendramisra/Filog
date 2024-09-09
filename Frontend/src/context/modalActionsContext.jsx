import { createContext, useState, useContext } from "react";

/**
 * Modal Actions Context
 * 
 * This context manages modal action handlers for primary and secondary buttons. 
 * Handlers can be added, cleared, and accessed by components that consume this context.
 */
const modalActionsContext = createContext({
    addModalActionHandlers: () => {},
    removeModalActionHandlers: () => {},
    modalActions: {}
});

/**
 * ModalActionsContextProvider
 * 
 * Provides the context for managing modal action handlers. This allows consumers to:
 * - Add new handlers for modal actions (e.g., primary/secondary buttons).
 * - Remove handlers based on the action ID.
 * 
 * @param {Object} children - React children elements.
 */
export const ModalActionsContextProvider = ({ children }) => {
    const [modalActions, setModalActions] = useState({});

    /**
     * Adds handler functions for modals (e.g., primary and secondary button actions).
     * The new actions should be an object where the key is the modal ID, and 
     * the value is an object containing the handler functions for that modal.
     * 
     * Example of a modal action object:
     * {
     *    modalId: {
     *       primaryOnClick: () => {
     *         // Logic for primary button click
     *       },
     *       secondaryOnClick: () => {
     *         // Logic for secondary button click
     *       }
     *    }
     * }
     * 
     * @param {Object} newAction - An object containing new modal action handlers.
     */
    const addModalActionHandlers = (newAction) => {
        setModalActions((prevActions) => {
            const newActions = { ...prevActions, ...newAction };
            return newActions;
        });
    };

    /**
     * Removes handler functions for a specific modal based on its action ID.
     * 
     * @param {string} actionId - The unique identifier for the modal action to be removed.
     */
    const removeModalActionHandlers = (actionId) => {
        const newActions = { ...modalActions };
        delete newActions[actionId];
        setModalActions(newActions);
    };

    return (
        <modalActionsContext.Provider value={{ addModalActionHandlers, modalActions, removeModalActionHandlers }}>
            {children}
        </modalActionsContext.Provider>
    );
};

/**
 * useModalActionsContext
 * 
 * A custom hook to provide access to the modal actions context. 
 * This hook allows components to add or remove modal action handlers.
 * 
 * @returns {Object} The context value, including `addModalActionHandlers`, `removeModalActionHandlers`, and `modalActions`.
 */
export default function useModalActionsContext() {
    return useContext(modalActionsContext);
}
