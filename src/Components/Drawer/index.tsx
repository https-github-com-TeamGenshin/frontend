import React, { useState, useEffect } from 'react'
import { LogoutOutlined, CloseOutlined, BackwardOutlined, SettingOutlined, NotificationOutlined, ForwardOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo.png"
import "./Drawer.css"
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { useNavigate } from 'react-router-dom';
import { upDateDrawerFront, upDateDrawerBackTo0 } from './DrawerUtils';
import { useSelector } from 'react-redux';
import { message } from 'antd';




export const Drawer = ({ trigger }: { trigger: any }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { name, email_id, mobile_no, location } = useSelector((state: any) => state.login)

    const [state, setstate] = useState<number>(0)

    const Logout = () => {
        message.success("Logout Successfully")
        dispatch(loginAction.logout())
        localStorage.removeItem("token")
        navigate("/")
    }

    useEffect(() => {
        if (trigger) {
            let content = document.getElementById("drawer")
            if (content) {
                content.style.display = "block"
            }
            setstate(1)
        }
    }, [trigger]);

    const upDateDrawerBack = () => {
        const drawer = document.getElementById("backward-drawer");
        if (drawer) {
            drawer.style.display = "none";
        }
        document.getElementById("drawer")?.classList.add("drawer-width-min")
        setTimeout(() => {
            setstate(0)
        }, 1000)
    }

    const State2 = <div className='flex flex-col gap-5 pt-3'>
        <div className='flex flex-wrap justify-evenly items-center font-semibold gap-3'>
            <img className='w-12 h-10' src={logo} />
            <div className='text-xl'>OneCab</div>
            <CloseOutlined className='text-3xl' onClick={() => upDateDrawerBackTo0(setstate)} />
        </div>
        <div className='flex bg-slate-100 p-5 flex-col justify-center items-center gap-3'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtMfy4lLEvhrLkv8FRibbj2rJaHYFEqTPmQ&usqp=CAU' className='w-20 h-20 rounded-full shadow-lg border-2 '></img>
            <section className='px-3  h-7 text-center  shadow-lg border'>{name}</section>
            <section className=' px-3 h-7 text-center  shadow-lg border'>{email_id}</section>
            <section className=' px-3 h-7 text-center  shadow-lg border'>{mobile_no}</section>

        </div>
        {/* <div className='flex flex-col items-center gap-5'>
            <div className='text-[10px] font-bold'>MAIN</div>
            <SettingOutlined className='text-xl' />
            <NotificationOutlined className='text-xl' />
            <LogoutOutlined className='text-xl' />
        </div> */}
        <div className='flex flex-col items-center gap-5'>
            <div className='text-[10px] font-bold'>SETTINGS</div>
            <div className='flex items-center gap-3'>
                <SettingOutlined className='text-xl' /> <p>Settings</p>
            </div>
            <div className='flex items-center justify-center gap-3'>
                <NotificationOutlined className='text-xl' /> <p>Notification</p>
            </div>
            <div onClick={() => Logout()} className='flex items-center justify-center gap-3'>
                <LogoutOutlined className='text-xl' /> <p>Logout</p>
            </div>
        </div>
    </div>



    return (
        <div id="drawer" className={`absolute top-0 
        bg-white text-slate-500 h-screen ${state === 0 ? "hidden" : "w-3/12"} rounded-r-xl`}>
            {State2}
        </div>
    )
}
