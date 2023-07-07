import React from 'react'
import cab2 from "../../Assets/cab2.jpg"
import logo from "../../Assets/logo.png"
import { Input } from 'antd'

export const Page3 = ({ setpage }: { setpage: any }) => {
  return (
    <div className='flex'>
      <div className='w-[40vw] h-screen overflow-hidden'>
        <img className='relative' src={cab2} ></img>
      </div>
      <div className='w-[60vw] flex flex-col gap-10 justify-center items-center'>
        <img className='w-48 bg-black rounded-3xl' src={logo}></img>
        <Input className='w-1/3 placeholder:text-black' placeholder='Experience Year'></Input>
        <Input className="w-1/3 placeholder:text-black" placeholder='Rate Per Km'></Input>
        <Input className="w-1/3 placeholder:text-black" placeholder='Rate Per Hour'></Input>
        <button className='bg-black text-2xl text-white px-8 py-2 rounded-xl'>Register</button>
      </div>

    </div>
  )
}
