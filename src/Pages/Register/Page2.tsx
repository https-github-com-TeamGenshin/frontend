import { useEffect, useState } from 'react'
import { MailOutlined, MobileOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo.png"
import { EmailVerification } from '../../Components/Popup/EmailVerification';
import { useSelector } from 'react-redux';

export const Page2 = ({ setpage }: { setpage: any }) => {


    const [UserPopupVal, setUserPopup] = useState(0)

    const isEmailVerify = useSelector((state: any) => state.login.isEmailVerify)


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
