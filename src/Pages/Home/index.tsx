import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Drawer } from '../../Components/Drawer';
import { get$verifyUserToken } from '../../API/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { MenuOutlined } from '@ant-design/icons';

const Home = () => {

  const ref = useRef()

  const [trigger, setTrigger] = useState(0);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
    else {
      get$verifyUserToken().then((data) => dispatch(loginAction.addLogin({ _id: data.data }))).catch(err => console.log(err))
    }
  }, [])

  return (
    <div className="text-white bg-slate-800 h-screen w-screen">
      {/* <div className='text-xl'>Home Screen</div> */}
      <MenuOutlined onClick={() => setTrigger(trigger + 1)} />
      <Drawer trigger={trigger} />
    </div>
  )
}

export default Home

