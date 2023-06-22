import React, { useEffect } from 'react'
import { MailOutlined } from '@ant-design/icons'
import "./Popup.css"
import { post$validateEmail } from '../../API/OTP'
import jwtDecode from 'jwt-decode'
import { message } from 'antd'

export const EmailVerification = () => {

    const [state, setstate] = React.useState(0)
    const [otp, setotp] = React.useState(0)
    const emailRef = React.useRef<HTMLInputElement | null>(null)

    const Handle$Email = () => {
        // post$validateEmail({ email_id: emailRef.current?.value }).then((res: any) => {
        //     const decoded : {otp : number} = jwtDecode(res.data.token)
        //     setotp(decoded.otp)
        //     console.log(res.data.token)
        //     if (res.status === 200) {
        //         message.success("OTP sent to your email")
        //     }
        // })
        setstate(1)
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
        <div id="user-popup" className='OTP-popup bg-[#481606] flex justify-center items-center rounded-t-[7rem] absolute bottom-0 left-0 z-20 w-screen '>
            <div className='flex flex-col items-center gap-4'>
                <div>
                    <h1 className='text-white text-2xl'>Email Verification</h1>
                </div>
                {state === 0 && <div className='bg-white w-[75vw] flex items-center gap-3 p-3 rounded-xl'>
                    <MailOutlined className='text-xl text-slate-700' />
                    <input ref={emailRef} placeholder='Email address' className='w-[70vw] outline-none'></input>
                </div>}
                {state === 1 && <div onLoad={() => console.log("Loaded")} className='w-[75vw] flex items-center justify-evenly gap-3 p-3 rounded-xl'>
                    <div className='bg-white w-10 h-10 flex justify-center items-center'>
                        <input onKeyDown={(data) => Handle$OTPBack(data.key, 0)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 0)} id="otp-0" className='w-4 h-5 text-xl font-bold outline-none'></input>
                    </div>
                    <div className='bg-white w-10 h-10 flex justify-center items-center'>
                        <input onKeyDown={(data) => Handle$OTPBack(data.key, 1)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 1)} id="otp-1" className='w-4 h-5 text-xl font-bold outline-none'></input>
                    </div>
                    <div className='bg-white w-10 h-10 flex justify-center items-center'>
                        <input onKeyDown={(data) => Handle$OTPBack(data.key, 2)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 2)} id="otp-2" className='w-4 h-5 text-xl font-bold outline-none'></input>
                    </div>
                    <div className='bg-white w-10 h-10 flex justify-center items-center'>
                        <input onKeyDown={(data) => Handle$OTPBack(data.key, 3)} type="number" onChange={(event) => Handle$OTPInputs(event.target.value.toString(), 3)} id="otp-3" className='w-4 h-5 text-xl font-bold outline-none'></input>
                    </div>

                </div>}
                <button id="submit-btn" onKeyDown={(data) => Handle$OTPBack(data.key, 4)} onClick={() => Handle$Email()} className='w-[80vw] p-4 text-white bg-[#14224a]'>{state === 0 ? "Next" : "Submit"}</button>
            </div>
        </div>
    )
}
