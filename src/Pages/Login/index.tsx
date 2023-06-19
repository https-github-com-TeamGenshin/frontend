import React, { useRef } from 'react'
import { post$loginUser } from '../../API/Login'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import {useDispatch, useSelector} from "react-redux"

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
      <div>
        <input ref={usernameRef} className='border-2 border-black' placeholder='username' />
        <input ref={passwordRef} className='border-2 border-black' placeholder='password' />
        <button onClick={() => HandleLoginButton()}>LOGIN</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>

    </div>
  )
}
