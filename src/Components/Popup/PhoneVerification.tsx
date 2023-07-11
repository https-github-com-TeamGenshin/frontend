import React, { useState } from 'react';
import { auth } from '../../config/firebase.config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

export const PhoneVerification = (): JSX.Element => {
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [ph,setPh] = useState<string>('')
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<Number | null>(null); // Use the User interface as the type for the user state

  function onCaptchVerify(): void {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response: any) => {
            onSignup();
          },
          'expired-callback': () => { },
        },  
        auth
      );
    }
  }

  function onSignup(): void {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = (window as any).recaptchaVerifier;

    const formatPh = '+91' + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        (window as any).confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify(): void {
    setLoading(true);
    (window as any).confirmationResult
      .confirm(otp)
      .then(async (res: any) => {
        // console.log(res);
        setPhoneNumber(res.user.phoneNumber);
        setLoading(false);
      })
      .catch((err: any) => {
        // console.log(err);
        setLoading(false);
      });
  }

  return (
    <div>PhoneVerification</div>
  );
};
