import React from 'react';
import { useSelector } from 'react-redux';
import { AlertModal } from '../';
import useModalActionsContext from '../../context/modalActionsContext';

function ModalContainer() {
  const modals = useSelector((state) => state.alertModals);
  const { modalActions } = useModalActionsContext();
  
  // Return null if there's only one modal in the array
  if (modals.length <= 1) return null;

  return (
    <div className=' flex items-center justify-center h-100vh w-full bg-black bg-opacity-70 dark:bg-opacity-80 fixed' style={{ zIndex: "60" }}>
      {modals.map((modal, idx) => {
        // Skip rendering the first modal
        if (idx === 0) return null;

        const primaryOnClick = modalActions[modal.id]?.primaryOnClick;
        const secondaryOnClick = modalActions[modal.id]?.secondaryOnClick;

        return (
          <AlertModal
            key={modal.id}
            heading={modal.heading}
            message={modal.message}
            feedbackMessage={modal.feedbackMessage}
            primaryOnClick={primaryOnClick}
            secondaryOnClick={secondaryOnClick}
            ctaDisabled={modal.ctaDisabled}
            ctaDanger={modal.ctaDanger}
            primaryBtnText={modal.primaryBtnText}
            secondaryBtnText={modal.secondaryBtnText}
            btnLoading={modal.ctaLoading}
          />
        );
      })}
    </div>
  );
}

export default ModalContainer;
