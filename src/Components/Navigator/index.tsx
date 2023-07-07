import React from 'react'
import logo from "../../Assets/logo.png"
import { MenuOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { utilsActions } from '../../store/utils-slice';


export const Navigator = () => {

  const dispatch = useDispatch()

  return (
    <div className='flex items-center py-3 px-6 gap-6 bg-slate-800 text-white'>
      <MenuOutlined className='text-white text-xl' onClick={() => dispatch(utilsActions.toggleDrawer({showDrawer : 1}))} />
      <img className='w-28' src={logo}></img>
      <div className='flex w-full justify-center gap-28'>
        <section className='text-2xl'>Home</section>
        <section className='text-2xl'>Requests</section>
        <section className='text-2xl'>History</section>
      </div>
    </div>
  )
}
