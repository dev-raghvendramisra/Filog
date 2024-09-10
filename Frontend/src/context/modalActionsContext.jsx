import { createContext,useState, useContext } from "react";


const modalActionsContext = createContext(
    {
        addModalActionHandlers: () => {},
        removeModalActionHandlers: () => {},
        modalActions:{}
    }
);

export const ModalActionsContextProvider = ({children}) => {
    const [modalActions, setModalActions] = useState({});

    const addModalActionHandlers = (newAction) => {
        setModalActions((prevActions) => {
          const newActions = {...prevActions, ...newAction};
          return newActions;
        });
      };
      
    const removeModalActionHandlers = (actionId) => {
        const newActions = {...modalActions};
        delete newActions[actionId];
        setModalActions(newActions);
    }
    return(
        <modalActionsContext.Provider value={{addModalActionHandlers,modalActions,removeModalActionHandlers}}>
            {children}
        </modalActionsContext.Provider>
    )
}

export default function useModalActionsContext(){
    return useContext(modalActionsContext);
}