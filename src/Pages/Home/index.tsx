import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Drawer } from '../../Components/Drawer';
import { get$verifyUserToken } from '../../API/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { MenuOutlined } from '@ant-design/icons';
import { message } from 'antd';
import logo from "../../Assets/logo.png"
import { Navigator } from '../../Components/Navigator';
import { CitiesAutoComplete } from '../../Components/Autocomplete/Cities';
import { sessionActions } from '../../store/session-slice';
import Background from "../../Assets/background2.png"


const Home = () => {

  const [city, setcity] = useState<string>("")

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const { RequestDetails } = useSelector((state: any) => state.login)


  const Handle$Response$VerifyToken = (data: any) => {
    console.log(data)
    dispatch(loginAction.addloader({ loader: false }))
    if (data.status === 500) {
      message.error(data.data)
      navigate("/")
    }
    else {
      dispatch(sessionActions.addSessionUserID({ user_id: data.data.id }))
      dispatch(loginAction.addLogin({ _id: data.data.id, name: data.data.username, email_id: data.data.email_id, mobile_no: data.data.mobile_no, location: data.data.location }))
    }

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

  const Handle$Onchange$VechileType = (ev: any) => {
    dispatch(loginAction.addType({ type: ev.target.value }))
    dispatch(sessionActions.addSessionType({ type: ev.target.value }))
  }

  return (
    <div>
      <div className='absolute top-0 -z-10 blur-sm'>
        <img className='h-screen w-screen overflow-hidden' src={ Background } ></img>
      </div>
      <div className="">
        <Navigator/>
        <div className=' p-6 flex gap-6 justify-around items-center'>
          <select onChange={Handle$Onchange$VechileType} className='p-1 rounded w-[20vw] outline-none' name="Vehicle">
            <option value="">Vehicle Type</option>
            <option value="two-wheeler">Two Wheeler</option>
            <option value="three-wheeler">Three Wheeler</option>
            <option value="four-wheeler">Four Wheeler</option>
          </select>
          <CitiesAutoComplete city={city} setcity={setcity} />
        </div>
        <div className='flex justify-evenly'>
          <section className='flex flex-col items-center justify-center gap-3 w-full'>
            <div className='py-7 flex items-center'>
              <img src="https://c4.wallpaperflare.com/wallpaper/900/398/321/anime-demon-slayer-kimetsu-no-yaiba-zenitsu-agatsuma-hd-wallpaper-preview.jpg" className='border w-96 rounded-3xl'></img>
            </div>
            <div onClick={() => {
              if (Validate$TypeandCity()) navigate("/cabs")
            }} className='bg-[#14224A] p-2 text-center font-bold rounded-xl w-[10vw] text-white'>Explore</div>
          </section>
          <section className='flex flex-col items-center justify-center gap-3 w-full'>
            <div className=' py-7 flex items-center'>
              <img src="https://c4.wallpaperflare.com/wallpaper/900/398/321/anime-demon-slayer-kimetsu-no-yaiba-zenitsu-agatsuma-hd-wallpaper-preview.jpg" className=' w-96 rounded-3xl'></img>
            </div>
            <div onClick={() => {
              if (Validate$TypeandCity()) navigate("/drivers")
            }} className='bg-[#14224A] p-2 text-center font-bold rounded-xl w-[10vw] text-white'>Explore</div>
          </section>
        </div>
      </div>
    </div>

  )
}

export default Home

