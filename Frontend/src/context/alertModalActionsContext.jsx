import { createContext,useState, useContext } from "react";


const AlertModalActionsContext = createContext(
    {
        addModalActionHandlers: () => {},
        clearModalActionHandlers: () => {},
        modalActions:{}
    }
);

export const AlertModalActionsContextProvider = ({children}) => {
    const [modalActions, setModalActions] = useState({});

    const addModalActionHandlers = (newAction) => {
        setModalActions((prevActions) => {
          const newActions = {...prevActions, ...newAction};
          return newActions;
        });
      };
      
    const clearModalActionHandlers = (actions) => {
        const newActions = {...modalActions};
        delete newActions[actions];
        setModalActions(newActions);
    }
    return(
        <AlertModalActionsContext.Provider value={{addModalActionHandlers,modalActions,clearModalActionHandlers}}>
            {children}
        </AlertModalActionsContext.Provider>
    )
}

export default function useAlertModalActionsContext(){
    return useContext(AlertModalActionsContext);
}