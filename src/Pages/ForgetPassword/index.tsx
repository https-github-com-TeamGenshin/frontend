import React, { useRef,useState,useEffect } from 'react'
import { post$loginUser } from '../../API/Login'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {useDispatch, useSelector} from "react-redux"

export const ForgetPassword = () => {
    const navigate = useNavigate()
    const [timerCount,setTimer] = useState(60);
    const [OTPinput,setOTPinput] = useState([0, 0, 0, 0])
    const [disabled,setDisabled] = useState(true);

  const usernameRef = useRef<HTMLInputElement | null>(null);

  const HandleLoginButton = async() => {
     const email = usernameRef.current?.value
    
    if(email) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        // console.log(OTP);
        const data = {
            email_id: email,
            otp: OTP,
        }
        // console.log(data)
        // const otpSend = await axios.post("",{
        //     data
        // })
        // if(otpSend){
        //     setDisabled(true)
        //     alert("A new OTP has successfully been sent to your email.")
        //     setTimer(60)
        // } else {
        //     alert("A OTP request not send.")
        // }
    }
  }

  const resendOTP = () => {
    if(timerCount !== 0) return;
    setDisabled(true);
    setTimer(60);
  }

  useEffect(() => {
    let interval = setInterval(() => {
        setTimer((lastTimerCount: number) => {
            lastTimerCount <= 1 && clearInterval(interval);
            if(lastTimerCount <= 1) setDisabled(false);
            if(lastTimerCount <= 0) return lastTimerCount;
            return lastTimerCount - 1
        })
    },1000) // each count lasts for a second
    // cleanup the interval on complete
    return () => clearInterval(interval)
  },[disabled])

  return (
    <div>
      <div>
        <input ref={usernameRef} className='border-2 border-black' placeholder='username' />
        <button onClick={() => HandleLoginButton()}>Send OTP</button>
      </div>
      <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center"
                      style={{
                        color: disabled ? "gray" : "blue",
                        cursor: disabled ? "none" : "pointer",
                        textDecorationLine: disabled ? "none" : "underline",
                      }}
                      onClick={() => resendOTP()}
                    >
                      {disabled ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
                    </a>
                  </div>

    </div>
  )
}
