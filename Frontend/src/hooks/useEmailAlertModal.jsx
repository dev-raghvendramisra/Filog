import React from 'react';
import { AlertModal, GenToast} from '../components';
import { getNewVerificationEmail } from '../utils';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useEmailAlertModal({ openAlert, ctaDanger, setOpenAlert, userData }) {
    const [feedbackMessage, setFeedbackMessage] = React.useState({});
    const [err,setErr] = React.useState(null);
    const [timer,setTimer] = React.useState(null);
    const [ctaDisabled, setCtaDisabled] = React.useState(false);
    const navigate = useNavigate()
    const errMsg = ["Invalid verification link", "Email already verified"];

    const primaryOnClick = React.useCallback(async() => {
        setCtaDisabled(true);
        // Call the API to send the verification email
        const res = await getNewVerificationEmail({userData, setErr, errMsg, navigate, setTimer}); 
        if(res) {
            setFeedbackMessage({type:'success', message:'Email sent successfully!'});
            toast.custom(<GenToast type='success'>Email sent successfully!</GenToast>);
        }
    },[userData]);

    const secondaryOnClick = React.useCallback(() => {
        setOpenAlert(false);// Close the modal on secondary action
        clearTimeout(timer);// Clear the timer if the modal is closed
    },[timer]);

    React.useEffect(() => {
        if(err){
            setFeedbackMessage({type:'err', message:err});
            toast.custom(<GenToast type='err'>{err}</GenToast>);
        }
    },[err]);


    // Return the AlertModal only if openAlert is true
    return openAlert ? 
        <AlertModal
            heading='Email verification'
            message="To verify your email, click the button below to request a verification email. Follow the instructions in the email to complete verification. If you don't receive it within a few minutes, check your spam folder or try again."
            feedbackMessage={feedbackMessage}
            ctaDisabled={ctaDisabled}
            ctaDanger={ctaDanger}
            primaryBtnText='Request email'
            secondaryBtnText='Cancel'
            primaryOnClick={primaryOnClick}
            secondaryOnClick={secondaryOnClick}
        />
     : null;
}
