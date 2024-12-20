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
  ctaDanger = false,
  btnLoading = false,
}) {
  const uniqueId = ID.unique();
  const modalRef = React.useRef(null)
  const p_btnRef = React.useRef(null)
  const s_btnRef = React.useRef(null)
  React.useEffect(()=>{
   modalRef.current.focus();
  },[])

  return (
    <div
     tabIndex={0}
     ref={modalRef}
     onKeyDown={(e)=>{
       if(e.key==="Enter") return p_btnRef.current.click()
       if(e.key==="Escape") return s_btnRef.current.click()
     }}
      
     id={`${uniqueId}-alertModal-wrapper`} className='w-fit focus:border-0 focus:dark:border-0 rounded-3xl p-1.5vw bg-white dark:bg-darkPrimary max-w-40vw absolute modalAnim'>
      <div id={`${uniqueId}-alertModal-header`} className='flex justify-start gap-4 items-center text-1.7vw font-medium'>
        <span className={`${ctaDanger ? "text-danger" : "text-caution"} fa-solid fa-triangle-exclamation text-2vw`}></span>
        <p id={`${uniqueId}-alertModal-heading`}>
          {heading}
        </p>
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
          ref={s_btnRef}
        >
          {secondaryBtnText}
        </Button>
        <Button
          primary={!ctaDisabled && !ctaDanger}
          danger={ctaDanger && !ctaDisabled}
          disabled={ctaDisabled}
          loading={btnLoading}
          id={`${uniqueId}-alertModal-cta`}
          onClick={primaryOnClick}
          className='text-1vw'
          ref={p_btnRef}
          wide
        >
          {primaryBtnText}
        </Button>
      </div>
    </div>
  );
}

export default AlertModal;
