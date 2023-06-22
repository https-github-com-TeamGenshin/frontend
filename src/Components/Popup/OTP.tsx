import React from 'react'
import "./Popup.css"

export const OTPPopup = () => {
    return (
        <div className='OTP-popup bg-green-600 flex justify-center items-center rounded-t-xl absolute bottom-0 left-0 z-10 h-1/4 w-screen '>
            <div className='flex flex-col'>
                <input></input>
                <button>Submit</button>
            </div>
        </div>
    )
}
