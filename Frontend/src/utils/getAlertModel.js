
import { setModal } from "../store/alertModalSlice";

export default function getAlertModel({ 
   dispatch, 
   primaryOnClick,
   secondaryOnClick,
   heading,
   message, 
   ctaDanger, 
   primaryBtnText, 
   secondaryBtnText, 
   addModalActionHandlers, 
   actionId,
    }) {
   const actionHandlers = {
      [actionId]: {
         primaryOnClick,
         secondaryOnClick
      }
   }
   addModalActionHandlers(actionHandlers)
   dispatch(setModal({
      heading,
      message,
      feedbackMessage:{},
      ctaDisabled:false,
      ctaDanger,
      primaryBtnText,
      secondaryBtnText,
      loading:false,
      id: actionId
   }))
}