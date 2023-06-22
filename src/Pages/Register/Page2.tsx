import { useEffect, useRef, useState } from 'react'
import { provider, auth } from '../../utils/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { MailOutlined, MobileOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { OTPPopup } from '../../Components/Popup/OTP';
import { post$validateEmail } from '../../API/OTP';
import jwtDecode from 'jwt-decode';
import logo from "../../Assets/logo.png"
import { EmailVerification } from '../../Components/Popup/EmailVerification';

export const Page2 = ({ setpage }: { setpage: any }) => {

    const [showPopup, setshowPopup] = useState(false)

    const [UserPopupVal, setUserPopup] = useState(0)


    const emailRef = useRef<HTMLInputElement | null>(null);
    const mobileRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    //decode jwt token in react

    useEffect(() => {
        console.log(UserPopupVal)
    }, [UserPopupVal])

    // Gmail login using google firebase
    const HandleVerifyEmail = () => {
        // post$validateEmail({ email_id: emailRef.current?.value }).then((res: any) => {
        //     const decoded = jwtDecode(res.data.token)
        //     console.log(decoded)
        //     console.log(res.data.token)
        //     if (res.status === 200) {
        //         message.success("OTP sent to your email")
        //     }
        // })
        setshowPopup(true)
    }


    return (
        <div>
            <>
                <div className={` ${UserPopupVal ? "blur-sm" : ""} bg-[#082000] h-screen w-screen flex flex-col items-center justify-center`}>
                    <div className='text-white p-8 flex flex-col items-center gap-4'>
                        <img className='w-[60vw]' src={logo}></img>
                        <p className='text-2xl font-semibold text-center'>Verify with the Below Options</p>
                    </div>
                    <div className='flex w-[80vw] flex-col gap-5 '>
                        <div onClick={() => setUserPopup(1)} className='bg-[#d9d9d9] flex items-center gap-3 p-3 rounded-xl'>
                            <MailOutlined  className='text-6xl text-slate-500' />
                            <div>
                                <p className='font-bold'>E-Mail</p>
                                <p>Verification using E-mail</p>
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
                    UserPopupVal === 1 && <EmailVerification />
                }
            </>
        </div>
    )
}
