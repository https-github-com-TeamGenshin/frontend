import React from 'react'
import { Navigator } from '../../Components/Navigator';
import { DownOutlined } from '@ant-design/icons';
import { Card } from './Card';

// type
// car name
// payable amount



export const History = () => {

  const dateTime = "2023-07-08 02:08:33"

  return <div className="bg-slate-300 w-screen h-screen">
    <Navigator />
    <p className='text-center text-2xl'>Before</p>
    <Card/>
    <p className='text-center text-2xl'>After</p>
    <Card />
  </div>;
}
