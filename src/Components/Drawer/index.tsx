import React, { useState, useEffect } from 'react'
import { LogoutOutlined, UserOutlined, BackwardOutlined, SettingOutlined, NotificationOutlined, ForwardOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo.png"
import "./Drawer.css"
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { useNavigate } from 'react-router-dom';
import { upDateDrawerFront, upDateDrawerBackTo0 } from './DrawerUtils';
import { message } from 'antd';




export const Drawer = ({ trigger }: { trigger: any }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
            setstate(1)
        }, 1000)
    }

    const State1 = <div className='flex flex-col gap-5 pt-3'>
        <div className='flex items-center justify-center'>
            <img className='w-15 h-12 -p-1' src={logo} />
        </div>
        <div className='flex flex-col items-center gap-5'>
            <UserOutlined className='text-xl' />
        </div>
        <div className='flex flex-col items-center gap-5'>
            <div className='text-[10px] font-bold'>MAIN</div>
            <SettingOutlined className='text-xl' />
            <NotificationOutlined className='text-xl' />
            <LogoutOutlined className='text-xl' />
        </div>
        <div className='flex flex-col items-center gap-5'>
            <div className='text-[10px] font-bold'>SETTINGS</div>
            <SettingOutlined className='text-xl' />
            <NotificationOutlined className='text-xl' />
            <LogoutOutlined onClick={() => Logout()} className='text-xl' />
        </div>
        <div id="backward-drawer" onClick={() => upDateDrawerBackTo0(setstate)} style={{ left: "20vw", top: "5vh" }} className='text-xl absolute shadow-lg'> <BackwardOutlined className='p-1 bg-white border-slate-700 border rounded-md' /> </div>
        <div id="forward-drawer" onClick={() => upDateDrawerFront(setstate)} style={{ left: "20vw", top: "10vh" }} className='text-xl absolute shadow-lg'> <ForwardOutlined className='p-1 bg-white border-slate-700 border rounded-md' /> </div>
    </div>

    const State2 = <div className='flex flex-col gap-5 pt-3'>
        <div className='flex flex-wrap justify-center items-center font-semibold gap-3'>
            <img className='w-12 h-10' src={logo} />
            <div className='text-xl'>OneCab</div>
        </div>
        <div className='flex bg-slate-100 p-5 flex-col justify-center items-center gap-5'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtMfy4lLEvhrLkv8FRibbj2rJaHYFEqTPmQ&usqp=CAU' className='w-20 h-20 rounded-full shadow-lg border-2 '></img>
            <section className='w-28 h-7 text-center  shadow-lg border'>DeoKumar</section>
        </div>
        <div className='flex flex-col items-center gap-5'>
            <div className='text-[10px] font-bold'>MAIN</div>
            <SettingOutlined className='text-xl' />
            <NotificationOutlined className='text-xl' />
            <LogoutOutlined className='text-xl' />
        </div>
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
        <div id="backward-drawer" onClick={() => upDateDrawerBack()} style={{ left: "45vw", top: "10vh" }} className='z-10 text-xl absolute shadow-lg'> <BackwardOutlined className='p-1 bg-white border-slate-700 border rounded-md' /> </div>
    </div>

    return (
        <div id="drawer" className={`absolute top-0 
        bg-white text-slate-500 h-screen ${state === 0 ? "w-0" : state === 1 ? "w-3/12" : "w-6/12"} rounded-r-xl`}>
            {state === 1 && State1}
            {state === 2 && State2}
        </div>
    )
}
