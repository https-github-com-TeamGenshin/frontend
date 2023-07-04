import React, { useRef } from 'react'
import { post$loginUser } from '../../API/Login'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import logo from "../../Assets/logo.png"
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = () => {

  const navigate = useNavigate()


  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const HandleLoginButton = () => {
    const data = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value
    }
    post$loginUser(data).then((res: any) => {
      console.log(res)
      if (res.status === 200) {
        navigate("/home")
        message.success("Login Successfull")
      }
      else if (res.status === 400 || res.status === 404) {
        message.error(res.data.toString())
      }
    })
  }

  return (
    <div>
      <div className='text-black p-8 flex flex-col items-center gap-4'>
        <img className='w-[20vw]' src={logo}></img>
        <p className='text-2xl font-semibold text-center'>Welcome!</p>
      </div>
      <div className='flex flex-col w-screen items-center gap-5'>
        <div className='border-2 flex gap-4 border-black px-8 py-1 rounded-xl'>
          <UserOutlined className='text-2xl' />
          <input ref={usernameRef} className=' outline-none p-2 w-[20vw]' placeholder='Email Address' />
        </div>
        <div className='border-2 flex gap-4 border-black px-8 py-1 rounded-xl'>
          <LockOutlined className='text-2xl' />
          <input ref={passwordRef} className=' outline-none p-2 w-[20vw]' placeholder='Password' />
        </div>
        <button style={{ boxShadow: "3px 20px 27px -16px rgba(0,0,0,0.75)" }} className='bg-black text-white w-[30vw] text-xl p-3 rounded-xl' onClick={() => HandleLoginButton()}>LOGIN</button>
        <button className='text-[#ff942b]'>Forgot Password</button>
        <div className='flex justify-end w-[30vw] text-[#ff942b]'>
          <button onClick={() => navigate("/register")}>Register now!</button>
        </div>
      </div>

    </div>
  )
}
