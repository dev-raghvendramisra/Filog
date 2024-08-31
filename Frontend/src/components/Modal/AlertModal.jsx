import { ID } from 'appwrite';
import React from 'react';
import { Button, FeedbackMessage } from '../../components';

function AlertModal({
  heading,
  message,
  feedbackMessage = { type: "err", message: "This is err message" },
  primaryOnClick,
  primaryBtnText,
  secondaryBtnText,
  secondaryOnClick,
  ctaDisabled = false,
  ctaDanger = false
}) {
  const uniqueId = ID.unique();

  return (
    <div id={uniqueId+"alertModal-container"} className='h-100vh w-full bg-black bg-opacity-70 dark:bg-opacity-80 fixed flex justify-center left-0 top-0 items-center ' style={{zIndex:"100"}}>
      <div id={`${uniqueId}-alertModal-wrapper`} className='w-fit rounded-3xl p-1.5vw bg-white dark:bg-darkPrimary max-w-40vw absolute modalAnim'>
       <div id={`${uniqueId}-alertModal-header`} className='flex justify-between items-center text-1.5vw font-medium'>
        <p id={`${uniqueId}-alertModal-heading`}>
          {heading}
        </p>
        <img
          id={`${uniqueId}-alertModal-icon`}
          src={ctaDanger ? "/icons/dangerIcon.webp" : "/icons/warningIcon.webp"}
          className='h-2vw'
        />
      </div>
      <div id={`${uniqueId}-alertModal-body`} className='text-0.9vw mt-0.5vw'>
        <p id={`${uniqueId}-alertModal-message`} className='text-toastDarkModeBg dark:text-footer_text'>
          {message}
        </p>
        <FeedbackMessage
          id={`${uniqueId}-alertModal-feedback`}
          err={feedbackMessage.type === "err"}
          className='pl-none mt-1vw text-1vw'
          iconType='solid'
        >
          {feedbackMessage.message}
        </FeedbackMessage>
      </div>
      <div id={`${uniqueId}-alertModal-footer`} className='flex items-center justify-end gap-2 mt-2vw'>
        <Button
          outline
          id={`${uniqueId}-alertModal-secondary`}
          onClick={secondaryOnClick}
          className='text-1vw'
          wide
        >
          {secondaryBtnText}
        </Button>
        <Button
          primary={!ctaDisabled && !ctaDanger}
          danger={ctaDanger && !ctaDisabled}
          disabled={ctaDisabled}
          id={`${uniqueId}-alertModal-cta`}
          onClick={primaryOnClick}
          className='text-1vw'
          wide
        >
          {primaryBtnText}
        </Button>
      </div>
     </div>
    </div>
  );
}

export default AlertModal;
