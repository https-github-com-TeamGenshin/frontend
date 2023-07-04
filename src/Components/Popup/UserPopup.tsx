import React, { useEffect } from 'react'
import logo from "../../Assets/logo.png"
export const UserPopup = ({ setUserPopup }: { setUserPopup: any }) => {

    const Handle$Onclick = (usertype: string) => {
        localStorage.setItem("type", usertype)
        // document.getElementById("user-popup")?.classList.add("hidden")
        document.getElementById("user-popup")?.classList.replace("OTP-popup", "OTP-popup-remove")
        setTimeout(() => {
            setUserPopup(false)
        }, 1000)
    }


    return (
        <div id="user-popup" className='OTP-popup bg-[#481606] flex justify-center items-center rounded-t-3xl absolute bottom-0 left-0 z-20 h-1/4 w-screen '>
            <div className='flex gap-4'>
                <div onClick={() => Handle$Onclick("Customer")} className='flex flex-col items-center'>
                    <img className='w-28 h-24' src={logo}></img>
                    <p className='text-white'>Customer</p>
                </div>
                <div onClick={() => Handle$Onclick("Driver")} className='flex flex-col items-center'>
                    <img className='w-28 h-24' src={logo}></img>
                    <p className='text-white'>Driver</p>
                </div>
            </div>
        </div>
    )
}
