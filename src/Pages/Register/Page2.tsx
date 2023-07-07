import React, { useEffect, useState } from 'react'
import { MailOutlined, MobileOutlined, PhoneOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo.png"
import { EmailVerification } from '../../Components/Popup/EmailVerification';
import { useSelector, useDispatch } from 'react-redux';
import cab from "../../Assets/cab.jpg"
import { post$validateEmail } from '../../API/OTP';
import jwtDecode from "jwt-decode"
import { Button, message } from 'antd';
import { loginAction } from '../../store/login-slice';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import cab2 from "../../Assets/cab2.jpg"
import { useNavigate } from 'react-router-dom';


declare global {
    interface Window {
        recaptchaVerifier: any;
        confirmationResult: any;
    }
}

export const Page2 = ({ setpage }: { setpage: any }) => {


    const [UserPopupVal, setUserPopup] = useState(0)

    const isEmailVerify = useSelector((state: any) => state.login.isEmailVerify)
    const isPhoneVerify = useSelector((state: any) => state.login.isPhoneVerify)
    const isDriver = useSelector((state: any) => state.login.isDriver)

    const [state, setstate] = React.useState(0)
    const [otp, setotp] = React.useState(0)

    const [email, setemail] = React.useState("")
    const [phone, setphone] = React.useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Handle$Email = () => {
        dispatch(loginAction.addloader({ loader: true }))
        if (email === "") {
            message.error("Please enter email")
            dispatch(loginAction.addloader({ loader: false }))
            return
        }
        post$validateEmail({ email_id: email }).then((res: any) => {
            const decoded: { otp: number } = jwtDecode(res.data.token)
            setotp(decoded.otp)
            console.log(res.data.token)
            setstate(1)
            if (res.status === 200) {
                message.success("OTP sent to your email")
            }
            dispatch(loginAction.addloader({ loader: false }))
        })
    }

    function onCaptchVerify(): void {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response: any) => {
                    onSignup();
                },
                'expired-callback': () => { },
            },
            auth
        );
    }

    function onSignup(): void {
        // setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;

        const formatPh = '+91' + phone;

        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                // console.log(confirmationResult)
                window.confirmationResult = confirmationResult;
                console.log(confirmationResult)
                setstate(2)
                dispatch(loginAction.addloader({ loader: false }))
                // if (confirmationResult === 200) {
                //     message.success("OTP sent to your email")
                // }
                // setLoading(false);
                // setShowOTP(true);
            })
            .catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    }

    const Handle$Phone = () => {
        dispatch(loginAction.addloader({ loader: true }))
        console.log(phone)
        if (phone === "") {
            message.error("Please enter Phone Number")
            dispatch(loginAction.addloader({ loader: false }))
            return
        }
        onSignup()
    }



    function onOTPVerify(): void {
        const otp1: HTMLInputElement = document.getElementById("otp-0") as HTMLInputElement;
        const otp2: HTMLInputElement = document.getElementById("otp-1") as HTMLInputElement;
        const otp3: HTMLInputElement = document.getElementById("otp-2") as HTMLInputElement;
        const otp4: HTMLInputElement = document.getElementById("otp-3") as HTMLInputElement;
        const otp5: HTMLInputElement = document.getElementById("otp-4") as HTMLInputElement;
        const otp6: HTMLInputElement = document.getElementById("otp-5") as HTMLInputElement;



        const otpValue = otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value;

        (window as any).confirmationResult
            .confirm(otpValue)
            .then(async (res: any) => {
                console.log(res.user.phoneNumber, "+91" + phone);
                if (res.user.phoneNumber === "+91" + phone) {
                    message.success("Phone Number verified")
                    dispatch(loginAction.addPhoneVerfiy({ isPhoneVerify: true }))
                    setUserPopup(0)
                }
                // setPhoneNumber(res.user.phoneNumber);
                // setLoading(false);
            })
            .catch((err: any) => {
                console.log(err);
                // setLoading(false);
            });
    }

    const Handle$OTP = () => {
        const otp1: HTMLInputElement = document.getElementById("otp-0") as HTMLInputElement;
        const otp2: HTMLInputElement = document.getElementById("otp-1") as HTMLInputElement;
        const otp3: HTMLInputElement = document.getElementById("otp-2") as HTMLInputElement;
        const otp4: HTMLInputElement = document.getElementById("otp-3") as HTMLInputElement;
        const otp5: HTMLInputElement = document.getElementById("otp-4") as HTMLInputElement;
        const otp6: HTMLInputElement = document.getElementById("otp-5") as HTMLInputElement;



        const otpValue: number = parseInt(otp1.value + otp2.value + otp3.value + otp4.value + otp5.value + otp6.value)
        if (otpValue === otp) {
            message.success("Email verified")
            dispatch(loginAction.addEmailVerfiy({ isEmailVerify: true }))
            dispatch(loginAction.addUserEmail({ email_id: email }))
            setUserPopup(0)
        } else {
            message.error("Wrong OTP")
        }
    }

    useEffect(() => {
        if (state === 1) {
            document.getElementById("otp-0")?.focus()
        }
    }, [state])

    const Handle$OTPInputs = (content: string, id: number) => {
        if (id === 4) {
            document.getElementById("otp-3")?.focus()
        }
        if (content.length === 1 && id === 5) {
            document.getElementById("submit-btn")?.focus()
        }
        if (content.length === 1) {
            document.getElementById(`otp-${id + 1}`)?.focus()
        }
    }

    const Handle$OTPBack = (key: string, id: number) => {
        if (id === 6 && key === "Backspace") {
            document.getElementById("otp-5")?.focus()
            return
        } else if (id === 4) return
        const inputElement: HTMLInputElement = document.getElementById(`otp-${id}`) as HTMLInputElement;
        const inputValue: boolean = inputElement.value.length === 1;
        if (inputValue) return

        // console.log(document.getElementById(`otp-${id}`) as HTMLInputElement.value)
        if (key === "Backspace") {
            document.getElementById(`otp-${id - 1}`)?.focus()
        }
    }

    const Handle$OnClick$Button$Done = () => {
        if (!isEmailVerify) {
            message.error("Please verify your email")
            return
        } 
        if (!isPhoneVerify) {
            message.error("Please verify your phone number")
            return
        }
        if(isDriver) {
            message.success("You are successfully verified")
            setpage(2)
        }
        else navigate("/login")
    }


    return (
        <div className='flex'>
            <div className='w-[40vw] h-screen overflow-hidden'>
                <img className='relative' src={cab2} ></img>
            </div>
            <div id='recaptcha-container'></div>
            <div className='w-[60vw]'>
                <div className={`h-screen flex flex-col gap-3 items-center justify-center`}>
                    <div className='text-4xl p-4 flex flex-col items-center gap-4'>
                        Verify with the Below Options
                    </div>
                    <div className='m-4 flex gap-14 text-center'>
                        <div onClick={() => setUserPopup(1)} className={` ${isEmailVerify ? "pointer-events-none" : ""} cursor-pointer border-4 ${isEmailVerify ? "border-[#156795]" : "border-black"}  rounded-3xl  flex flex-col items-center gap-3 p-5`}>
                            <MailOutlined className='text-4xl text-slate-500' />
                            <div>
                                <p className='font-bold'>E-Mail</p>
                                <p className='text-xs'>Verification using E-mail</p>
                            </div>
                        </div>
                        <div onClick={() => setUserPopup(2)} className={`border-4 ${isPhoneVerify ? "border-[#156795]" : "border-black"} rounded-3xl cursor-pointer  flex flex-col items-center gap-3 p-5`}>
                            <MobileOutlined className='text-4xl text-slate-500' />
                            <div>
                                <p className='font-bold'>Phone</p>
                                <p className='text-xs'>Verification using Phone</p>
                            </div>

                        </div>
                    </div >
                    {UserPopupVal === 1 && <div className='bg-[#d9d9d9] w-[30vw] flex flex-col items-center rounded-3xl p-10'>
                        <div className='bg-white w-[20vw] flex items-center gap-3 p-2 rounded-xl'>
                            <MailOutlined className='text-xl text-slate-700' />
                            <input onChange={(event) => setemail(event.target.value)} placeholder='Email address' className='w-[70vw] outline-none'></input>
                        </div>
                        <div className='w-[20vw] flex items-center justify-center gap-3 p-3 rounded-xl'>
                            <button onClick={() => Handle$Email()} className='w-[10vw] rounded-lg p-2 text-white bg-[#14224a]'>Submit</button>
                            {/* <button id="submit-btn" onClick={() => Handle$Email()} className='w-[10vw] p-2 rounded-lg text-black bg-white'>Re-Send OTP</button> */}
                        </div>
                        {state === 1 && <> <div className='text-center flex flex-col justify-center p-3'>
                            <p className='text-2xl'>Enter otp send to</p>
                            <p className='text-[#969696] text-xl'>{email ?? "abc@gmail.com"}</p>
                        </div>
                            <div onLoad={() => console.log("Loaded")} className='w-[20vw] text-black flex items-center justify-evenly gap-3 p-3 rounded-xl'>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 0)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 0)} id="otp-0" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 1)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 1)} id="otp-1" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 2)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 2)} id="otp-2" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 3)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 3)} id="otp-3" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 4)} id="otp-4" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 5)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 5)} id="otp-5" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                            </div>
                            <div className='w-[20vw] flex items-center gap-3 p-3 rounded-xl'>
                                <button id="submit-btn" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onClick={() => Handle$OTP()} className='w-[10vw] rounded-lg p-2 text-white bg-[#14224a]'>Submit</button>
                                <button onClick={() => Handle$Email()} className='w-[10vw] p-2 rounded-lg text-black bg-white'>Re-Send OTP</button>
                            </div> </>}
                    </div>}
                    {UserPopupVal === 2 && <div className='bg-[#d9d9d9] w-[30vw] flex flex-col items-center rounded-3xl p-10'>
                        <div className='bg-white w-[20vw] flex items-center gap-3 p-2 rounded-xl'>
                            <PhoneOutlined className='text-xl text-slate-700' />
                            <input onChange={(event) => setphone(event.target.value)} placeholder='Phone Number' className='w-[70vw] outline-none'></input>
                        </div>
                        <div className='w-[20vw] flex items-center justify-center gap-3 p-3 rounded-xl'>
                            <button onClick={() => Handle$Phone()} className='w-[10vw] rounded-lg p-2 text-white bg-[#14224a]'>Submit</button>
                            {/* <button id="submit-btn" onClick={() => Handle$Email()} className='w-[10vw] p-2 rounded-lg text-black bg-white'>Re-Send OTP</button> */}
                        </div>
                        {state === 2 && <> <div className='text-center flex flex-col justify-center p-3'>
                            <p className='text-2xl'>Enter otp send to</p>
                            <p className='text-[#969696] text-xl'>{phone ?? "+91**********"}</p>
                        </div>
                            <div className='w-[20vw] text-black flex items-center justify-evenly gap-3 p-3 rounded-xl'>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 0)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 0)} id="otp-0" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 1)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 1)} id="otp-1" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 2)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 2)} id="otp-2" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 3)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 3)} id="otp-3" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 4)} id="otp-4" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                                <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                                    <input type="number" onKeyDown={(data) => Handle$OTPBack(data.key, 5)} onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 5)} id="otp-5" className='w-4 h-5 text-xl font-bold outline-none'></input>
                                </div>
                            </div>
                            <div className='w-[20vw] flex items-center gap-3 p-3 rounded-xl'>
                                <button id="submit-btn" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onClick={() => onOTPVerify()} className='w-[10vw] rounded-lg p-2 text-white bg-[#14224a]'>Submit</button>
                                <button onClick={() => Handle$Email()} className='w-[10vw] p-2 rounded-lg text-black bg-white'>Re-Send OTP</button>
                            </div> </>}
                    </div>}
                    <button onClick={() => Handle$OnClick$Button$Done()} className='text-3xl bg-black text-white px-8 py-2 rounded-xl' >{ isDriver ? "Next" : "Login"}</button>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <>
                <div className={` ${UserPopupVal ? "blur-sm" : ""} bg-[#082000] h-screen w-screen flex flex-col items-center justify-center`}>
                    <div className='text-white p-8 flex flex-col items-center gap-4'>
                        <img className='w-[60vw]' src={logo}></img>
                        <p className='text-2xl font-semibold text-center'>Verify with the Below Options</p>
                    </div>
                    <div className='flex w-[80vw] flex-col gap-5 '>
                        <div onClick={() => setUserPopup(1)} className={` ${isEmailVerify ? "pointer-events-none" : ""} bg-[#d9d9d9] flex items-center gap-3 p-3 rounded-xl`}>
                            <MailOutlined className='text-6xl text-slate-500' />
                            <div>
                                <p className='font-bold'>E-Mail</p>
                                {isEmailVerify ? <p>Email Verified !!!</p> : <p>Verification using E-mail</p>}
                            </div>
                        </div>
                        <div className='bg-[#d9d9d9] flex items-center gap-3 p-3 rounded-xl'>
                            <MobileOutlined className='text-6xl text-slate-500' />
                            <div>
                                <p className='font-bold'>Phone</p>
                                <p>Verification using Phone</p>
                            </div>
                        </div>
                    </div >
                </div>
                {
                    UserPopupVal && <div className=' bg-transparent bg-slate-200 absolute top-0 left-0 h-screen w-screen z-10'></div>
                }
                {
                    UserPopupVal === 1 && <EmailVerification setUserPopup={setUserPopup} />
                }
            </>
        </div>
    )
}
