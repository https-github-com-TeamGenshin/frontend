import React from 'react'
import logo from "../../Assets/logo.png"
import { MenuOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { utilsActions } from '../../store/utils-slice';
import { Link } from 'react-router-dom';


export const Navigator = () => {

  const dispatch = useDispatch()

  return (
    <div className='flex items-center py-3 px-6 gap-6 bg-slate-800 text-white'>
      <MenuOutlined className='text-white text-xl' onClick={() => dispatch(utilsActions.toggleDrawer({showDrawer : 1}))} />
      <img className='w-28' src={logo}></img>
      <div className='flex w-full justify-center gap-28'>
        <Link to = "/home" className='text-2xl'>Home</Link>
        <Link to = "/requests" className='text-2xl'>Requests</Link>
        <Link to = "/history" className='text-2xl'>History</Link>
      </div>
    </div>
  )
}
