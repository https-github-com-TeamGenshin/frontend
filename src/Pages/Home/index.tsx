import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Drawer } from '../../Components/Drawer';
import { get$verifyUserToken } from '../../API/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';

const Home = () => {

  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const Handle$Response$VerifyToken = (data: any) => {
    dispatch(loginAction.addloader({ loader: false }))
    if (data.status === 500) {
      message.error(data.data)
      navigate("/")
    }
    else dispatch(loginAction.addLogin({ _id: data.data }))
  }


  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    else {
      dispatch(loginAction.addloader({ loader: true }))
      get$verifyUserToken().then((data) => Handle$Response$VerifyToken(data)).catch(err => console.log(err))
    }
  }, [])

  return (
    <div className="text-white bg-slate-800 h-screen w-screen">
      {/* <div className='text-xl'>Home Screen</div> */}
      <MenuOutlined onClick={() => setTrigger(trigger + 1)} />
      <Link to="/register">Register</Link>
      <Drawer trigger={trigger} />
    </div>
  )
}

export default Home

