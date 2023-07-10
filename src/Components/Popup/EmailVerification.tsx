import React, { useEffect } from 'react'
import { MailOutlined } from '@ant-design/icons'
import "./Popup.css"
import { post$validateEmail } from '../../API/OTP'
import jwtDecode from 'jwt-decode'
import { message } from 'antd'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../store/login-slice'

export const EmailVerification = ({ setUserPopup }: { setUserPopup: any }) => {

    const [state, setstate] = React.useState(0)
    const [otp, setotp] = React.useState(0)
    const [email, setemail] = React.useState("")
    const emailRef = React.useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()

    const Handle$Email = () => {
        post$validateEmail({ email_id: email }).then((res: any) => {
            const decoded: { otp: number } = jwtDecode(res.data.token)
            setotp(decoded.otp)
            console.log(res.data.token)
            setstate(1)
            if (res.status === 200) {
                message.success("OTP sent to your email")
            }
        })
    }

    const Handle$OTP = () => {
        const otp1: HTMLInputElement = document.getElementById("otp-0") as HTMLInputElement;
        const otp2: HTMLInputElement = document.getElementById("otp-1") as HTMLInputElement;
        const otp3: HTMLInputElement = document.getElementById("otp-2") as HTMLInputElement;
        const otp4: HTMLInputElement = document.getElementById("otp-3") as HTMLInputElement;

        const otpValue: number = parseInt(otp1.value + otp2.value + otp3.value + otp4.value)
        if (otpValue === otp) {
            message.success("Email verified")
            // dispatch(loginAction.addEmailVerfiy({ isEmailVerify: true }))
            dispatch(loginAction.addUserEmail({ email_id: email }))
            setUserPopup(false)
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
        if (content.length === 1 && id === 3) {
            document.getElementById("submit-btn")?.focus()
        }
        if (content.length === 1) {
            document.getElementById(`otp-${id + 1}`)?.focus()
        }
    }

    const Handle$OTPBack = (key: string, id: number) => {
        if (id === 4 && key === "Backspace") {
            document.getElementById("otp-3")?.focus()
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






    return (
        <div id="user-popup" className='OTP-popup bg-[#301b0e] flex justify-center rounded-t-[7rem] absolute bottom-0 left-0 z-20 w-screen '>
            <div className='flex flex-col items-center'>

                {
                    state === 0 && <div className='h-[18vh] flex items-center'>
                        <h1 className='text-white text-2xl'>Email Verification</h1>
                    </div>
                }


                {
                    state === 1 && <div className='text-center flex flex-col justify-center h-[18vh]'>
                        <p className='text-white text-2xl'>Enter otp send to</p>
                        <p className='text-[#969696] text-xl'>{emailRef.current?.value ?? "abc@gmail.com"}</p>
                    </div>
                }
                <div className='bg-[#481606] h-[32vh] gap-4 w-screen  flex flex-col items-center justify-center'>

                    {state === 1 && <div onLoad={() => console.log("Loaded")} className='w-[75vw] flex items-center justify-evenly gap-3 p-3 rounded-xl'>
                        <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                            <input onKeyDown={(data) => Handle$OTPBack(data.key, 0)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 0)} id="otp-0" className='w-4 h-5 text-xl font-bold outline-none'></input>
                        </div>
                        <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                            <input onKeyDown={(data) => Handle$OTPBack(data.key, 1)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 1)} id="otp-1" className='w-4 h-5 text-xl font-bold outline-none'></input>
                        </div>
                        <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                            <input onKeyDown={(data) => Handle$OTPBack(data.key, 2)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 2)} id="otp-2" className='w-4 h-5 text-xl font-bold outline-none'></input>
                        </div>
                        <div className='bg-white rounded-lg w-10 h-10 flex justify-center items-center'>
                            <input onKeyDown={(data) => Handle$OTPBack(data.key, 3)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 3)} id="otp-3" className='w-4 h-5 text-xl font-bold outline-none'></input>
                        </div>

                    </div>
                    }
                    {
                        state === 1 && <>
                            <button id="submit-btn" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onClick={() => Handle$OTP()} className='w-[80vw] rounded-lg p-4 text-white bg-[#14224a]'>Submit</button>
                            <button id="submit-btn" onClick={() => Handle$Email()} className='w-[80vw] p-2 rounded-2xl text-black bg-white'>Re-Send OTP</button>
                            <div onClick={() => { setstate(0) }} className='text-white text-xl'>Cancel</div>
                        </>
                    }
                    {state === 0 && <div className='bg-white w-[75vw] flex items-center gap-3 p-3 rounded-xl'>
                        <MailOutlined className='text-xl text-slate-700' />
                        <input ref={emailRef} onChange={(event) => setemail(event.target.value)} placeholder='Email address' className='w-[70vw] outline-none'></input>
                    </div>}
                    {
                        state === 0 && <button onClick={() => Handle$Email()} className='w-[80vw] p-4 text-white bg-[#14224a]'>Next</button>
                    }

                </div>

            </div>
        </div>
    )
}
