import React, { useState, useRef } from 'react'
import { post$createUser } from '../../API/Register'
import { EyeTwoTone, EyeInvisibleOutlined, SettingOutlined, NotificationOutlined, ForwardOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import { AutoComplete } from 'antd';
import { Cities } from './Cities';

export const Register: React.FC = () => {

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const mobileRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);


  const HandleRegisterData = () => {
    const data = {
      name: nameRef.current?.value,
      email_id: emailRef.current?.value,
      mobile_no: mobileRef.current?.value,
      password: passwordRef.current?.value,
      gender: genderRef.current?.value,
      age: ageRef.current?.value,
      location: locationRef.current?.value
    }
    // post$createUser(data)
  }

  return (
    <div className='flex w-screen '>
      <div className='flex flex-col gap-5 w-1/2'>
        <input ref={nameRef} placeholder='name' />
        <input ref={emailRef} placeholder='Email_ID' />
        <input ref={mobileRef} placeholder='Mobile Number' />
        <input ref={passwordRef} placeholder="input password" />
        <input ref={genderRef} placeholder='Gender' />
        <input ref={ageRef} placeholder='Age' />
        <AutoComplete
          style={{ width: 200 }}
          options={Cities}
          // placeholder="try to type `b`"
          filterOption={(inputValue, option) => 
            option!.name.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <input ref={locationRef} placeholder='Location' />
        {/* <div onClick={() => post$createUser()}>Click Me</div> */}
      </div >
    </div>
  )
}

// name: "AjinkyaP",
//         email_id : "ajinkya@gmail.com",
//         mobile_no : "9876543210",
//         password : "12345678901",
//         gender : "Male",
//         age : 30,
//         location : "Pune"