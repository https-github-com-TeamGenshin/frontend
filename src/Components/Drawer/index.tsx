import { useEffect } from 'react'
import { LogoutOutlined, CloseOutlined } from '@ant-design/icons';
import logo from "../../Assets/logo-light.png"
import "./Drawer.css"
import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/login-slice';
import { useNavigate } from 'react-router-dom';
import { upDateDrawerBackTo0 } from './DrawerUtils';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { utilsActions } from "../../store/utils-slice"



export const Drawer = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { username, name, email_id, mobile_no, location } = useSelector((state: any) => state.login)
    const { showDrawer } = useSelector((state: any) => state.utils)

    const Logout = () => {
        message.success("Logout Successfully")
        dispatch(loginAction.logout())
        let content = document.getElementById("drawer")
            if (content) {
                content.style.display = "none"
            }
        localStorage.removeItem("token")
        dispatch(utilsActions.toggleDrawer({ showDrawer: 0 }))
        navigate("/")
    }

    useEffect(() => {
        if (showDrawer === 1) {
            let content = document.getElementById("drawer")
            if (content) {
                content.style.display = "block"
            }
        }
    }, [showDrawer]);

    const State2 = <div className='flex flex-col gap-5 pt-3'>
        <div className='flex flex-wrap justify-between pr-5 items-center font-semibold'>
            <img className='w-20' src={logo} />
            <div className='text-xl'>Cab Finder</div>
            <CloseOutlined className='text-3xl -mt-1' onClick={() => upDateDrawerBackTo0(dispatch)} />
        </div>
        <div className='flex bg-slate-100 p-5 flex-col justify-center items-center gap-3'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtMfy4lLEvhrLkv8FRibbj2rJaHYFEqTPmQ&usqp=CAU' className='w-20 h-20 rounded-full shadow-lg border-2 '></img>
            <section className='px-3 h-7 text-center  shadow-lg border'>{name ?? username}</section>
            <section className='px-3 h-7 text-center  shadow-lg border'>{email_id}</section>
            <section className='px-3 h-7 text-center  shadow-lg border'>{mobile_no}</section>

        </div>
        <div className='flex flex-col items-center gap-5'>
            <div onClick={() => Logout()} className=' cursor-pointer flex items-center justify-center gap-3'>
                <LogoutOutlined className='text-xl' /> <p>Logout</p>
            </div>
        </div>
    </div>

    return (
        <div id="drawer" className={`absolute top-0 
        bg-white text-slate-500 h-screen ${showDrawer === 0 ? "hidden" : "w-3/12"} rounded-r-xl`}>
            {State2}
        </div>
    )
}