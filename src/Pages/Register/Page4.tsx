import React from 'react'
import cab2 from "../../Assets/cab2.jpg"
import { Input } from 'antd'
import logo from "../../Assets/logo-light.png"

export const Page4 = () => {
    return (
        <div className='flex'>
            <div className='w-[50vw] h-screen overflow-hidden'>
                <img className='relative' src={cab2} ></img>
            </div>
            <div className='w-[60vw] flex flex-col gap-5 justify-center items-center'>
                <img className='w-48' src={logo}></img>
                <div className='text-center'>
                    <section>CREATE A PASSWORD</section>
                </div>
                <Input.Password className="w-2/5 placeholder:text-black p-3" placeholder="Enter Password" />
                <Input.Password className="w-2/5 placeholder:text-black p-3" placeholder="Confirm Password" />
                <button className='bg-black text-xl text-white px-8 py-2 rounded-xl'>Set Password</button>
            </div>

        </div>
    )
}
