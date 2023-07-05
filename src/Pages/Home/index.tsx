import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Drawer } from '../../Components/Drawer';
import { get$verifyUserToken } from '../../API/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { Navigator } from '../../Components/Navigator';
import { CitiesAutoComplete } from '../../Components/Autocomplete/Cities';


const Home = () => {


  const [trigger, setTrigger] = useState(0);
  const [city, setcity] = useState<string>("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { RequestDetails } = useSelector((state: any) => state.login)


  const Handle$Response$VerifyToken = (data: any) => {
    dispatch(loginAction.addloader({ loader: false }))
    if (data.status === 500) {
      message.error(data.data)
      navigate("/")
    }
    else dispatch(loginAction.addLogin({ _id: data.data.id, name: data.data.username, email_id: data.data.email_id, mobile_no: data.data.mobile_no, location: data.data.location }))
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

  useEffect(() => {
    dispatch(loginAction.addCity({ city: city }))
  }, [city])

  const Validate$TypeandCity = () => {
    if (RequestDetails.type === "") {
      message.error("Please Select Vehicle Type")
      return false
    }
    else if (city === "") {
      message.error("Please Select City")
      return false
    }

    else return true
  }


  return (
    <div className="bg-slate-800 h-screen w-screen">
      <div className='flex p-6 gap-6 text-white'>
        <MenuOutlined className='text-white text-xl' onClick={() => setTrigger(trigger + 1)} />
        <p className='text-xl'>Plan Ahead</p>
      </div>
      <div className='p-6 flex flex-col gap-6 items-center'>
        <select onChange={(ev) => dispatch(loginAction.addType({ type: ev.target.value }))} className='p-1 rounded w-[60vw] outline-none' name="Vehicle">
          <option value="">Vehicle Type</option>
          <option value="two-wheeler">Two Wheeler</option>
          <option value="three-wheeler">Three Wheeler</option>
          <option value="four-wheeler">Four Wheeler</option>
        </select>
        <CitiesAutoComplete city={city} setcity={setcity} />
      </div>
      <div>
        <section className='flex flex-col items-center justify-center gap-3 w-full'>
          <div className='border-[0.5px] w-[90vw] py-7 flex justify-center items-center'>
            <p className='text-white'>ADD CAB</p>
          </div>
          <div onClick={() => {
            if (Validate$TypeandCity()) navigate("/cabs")
          }} className='bg-white rounded-xl w-[30vw] text-[#8E271F]'>Explore</div>
        </section>
        <section className='flex flex-col items-center justify-center gap-3 w-full'>
          <div className='border-[0.5px] w-[90vw] py-7 flex justify-center items-center'>
            <p className='text-white'>ADD Driver</p>
          </div>
          <div onClick={() => {
            if (Validate$TypeandCity()) navigate("/drivers")
          }} className='bg-white rounded-xl w-[30vw] text-[#8E271F]'>Explore</div>
        </section>
      </div>
      <Drawer trigger={trigger} />
      <Navigator />
    </div>
  )
}

export default Home

