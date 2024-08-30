import React from 'react';
import { useSelector } from 'react-redux';
import { AlertModal } from '../';
import useAlertModalActionsContext from '../../context/alertModalActionsContext';

function ModalContainer() {
  const modals = useSelector((state) => state.alertModals);
  const { modalActions } = useAlertModalActionsContext();

  // Return null if there's only one modal in the array
  if (modals.length <= 1) return null;

  return (
    <div className='h-100vh w-full flex items-center justify-center fixed bg-black bg-opacity-50' style={{ zIndex: "60" }}>
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
          />
        );
      })}
    </div>
  );
}

export default ModalContainer;
