import React from 'react';
import { GenToast } from '../components';
import { getNewVerificationEmail, getAlertModel } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useModalActionsContext from '../context/modalActionsContext';
import { ID } from 'appwrite';
import { clearModal, setFeedbackMessage, setCtaLoading, setCtaDisabled } from '../store/alertModalSlice';

/**
 * Custom hook for managing alert modals with customizable handlers.
 * @param {Object} params - Configuration for the modal.
 * @param {boolean} params.ctaDanger - If true, styles the CTA as dangerous.
 * @param {Function} params.primaryHandler - Handler for the primary button click.
 * @param {Function} params.secondaryHandler - Handler for the secondary button click.
 * @param {string} params.heading - Modal heading.
 * @param {string} params.message - Modal message.
 * @param {string} params.primaryBtnText - Text for the primary button.
 * @param {string} params.secondaryBtnText - Text for the secondary button.
 * @param {string} params.modalId - Unique ID for the modal.
 * @returns {Function} Function to control the visibility of the modal.
 */
export default function useAlertModal({
  ctaDanger,
  primaryHandler,
  secondaryHandler,
  heading,
  message,
  primaryBtnText,
  secondaryBtnText,
  modalId,
  primaryOnClickDependencies = [],
  secondaryOnClickDependecies = []
}) {
  const dispatch = useDispatch();
  const { addModalActionHandlers, removeModalActionHandlers } = useModalActionsContext();
  const [openAlert, setOpenAlert] = React.useState(false);

  const primaryOnClick = React.useCallback(() => {
    dispatch(setCtaDisabled({ id: modalId, val: true }));
    primaryHandler();
  }, [...primaryOnClickDependencies]);

  const secondaryOnClick = React.useCallback(() => {
    secondaryHandler();
    setOpenAlert(false);
  }, [...secondaryOnClickDependecies]);

  React.useEffect(() => {
    if (openAlert) {
      getAlertModel({
        dispatch,
        primaryOnClick,
        secondaryOnClick,
        heading,
        message,
        ctaDanger,
        primaryBtnText,
        secondaryBtnText,
        addModalActionHandlers,
        actionId: modalId
      });
    } else {
      dispatch(clearModal(modalId));
      removeModalActionHandlers(modalId);
    }
  }, [openAlert]);

  React.useEffect(() => {
    removeModalActionHandlers(modalId);
    addModalActionHandlers(modalId, { primaryOnClick, secondaryOnClick });
  },[secondaryOnClick,primaryOnClick]);

  return setOpenAlert;
}

/**
 * Custom hook for managing email verification modals.
 * @param {string} [argHeading] - Modal heading.
 * @param {string} [argMessage] - Modal message.
 * @param {string} [argPrimaryBtnText] - Text for the primary button.
 * @param {string} [argSecondaryBtnText] - Text for the secondary button.
 * @returns {Function} Function to control the visibility of the modal.
 */
export function useEmailAlertModal(argHeading = "", argMessage = "", argPrimaryBtnText = "", argSecondaryBtnText = "") {
  const heading = argHeading || "Email Verification";
  const message = argMessage || "To verify your email, click the button below to request a verification email. Follow the instructions in the email to complete verification. If you don't receive it within a few minutes, check your spam folder or try again.";
  const primaryBtnText = argPrimaryBtnText || "Request email";
  const secondaryBtnText = argSecondaryBtnText || "Cancel";

  const [err, setErr] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timer, setTimer] = React.useState(null);
  const [modalId] = React.useState(ID.unique());
  const [localFeedbackMessage, setLocalFeedbackMessage] = React.useState({});
  const {userData:{email,emailVerification,$id}} = useSelector(state => state.auth);

  const errMsg = ["Invalid verification link", "Email already verified"];

  const primaryHandler = async () => {
    dispatch(setCtaLoading({ id: modalId, val: true }));
    console.log(email,emailVerification,$id);
    
    const res = await getNewVerificationEmail({ userData: {email,emailVerification,$id}, setErr, navigate, errMsg, setTimer, timer });
    if (res) {
      setLocalFeedbackMessage({ type: "success", message: "Email sent successfully" });
    } else {
      const newTimer = setTimeout(() => setOpenAlert(false), 7000);
      setTimer(newTimer);
    }
    dispatch(setCtaLoading({ id: modalId, val: false }));
  };

  const secondaryHandler = () => {};

  React.useEffect(() => {
    if (localFeedbackMessage.type) {
      toast.custom(<GenToast type={localFeedbackMessage.type}>{localFeedbackMessage.message}</GenToast>);
      dispatch(setFeedbackMessage({ id: modalId, feedbackMessage: localFeedbackMessage }));
    }
  }, [localFeedbackMessage]);

  React.useEffect(() => {
    if (err) setLocalFeedbackMessage({ type: "err", message: err });
  }, [err]);

  React.useEffect(() => () => clearTimeout(timer), [timer]);

  const setOpenAlert = useAlertModal({
    ctaDanger: false,
    primaryHandler,
    secondaryHandler,
    heading,
    message,
    primaryBtnText,
    secondaryBtnText,
    modalId,
    primaryOnClickDependencies: [email,emailVerification,$id],
  });

  return setOpenAlert;
}
