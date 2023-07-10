import React from 'react'
import cab2 from "../../Assets/cab2.jpg"
import logo from "../../Assets/logo.png"
import { Input } from 'antd'
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  onChange(info) {
    const { status } = info.file;
    console.log(info.file, info.fileList);
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export const Page3 = ({ setpage }: { setpage: any }) => {
  return (
    <div className='flex'>
      <div className='w-[40vw] h-screen overflow-hidden'>
        <img className='relative' src={cab2} ></img>
      </div>
      <div className='w-[60vw] flex flex-col gap-5 justify-center items-center'>
        <img className='w-24 bg-black rounded-3xl' src={logo}></img>
        <div className='text-center'>
          <section>HEY DRIVER !<br/>PLEASE PROVIDE YOUR<br/>DETAILS</section>
        </div>
        <Input className='w-2/5 placeholder:text-black p-3 ' placeholder='Experience Year'></Input>
        <Input className="w-2/5 placeholder:text-black p-3" placeholder='Rate Per Km'></Input>
        <Input className="w-2/5 placeholder:text-black p-3" placeholder='Rate Per Hour'></Input>
        <Input className="w-2/5 placeholder:text-black p-3" placeholder='Prefered Vehicle'></Input>
        <Dragger {...props}>
          <div className='w-[30vw] px-4'>
            <div className="flex w-full justify-end">
              <p className="w-fit p-3 rounded-xl bg-[#14224A] text-white text-lg" >CHOOSE FILE TO UPLOAD</p>
            </div>
            <p className="text-black font-bold p-4">
              DRAG <br /> AND <br /> DROP YOUR IMAGE
            </p>
          </div>
          
        </Dragger>
        <button className='bg-black text-2xl text-white px-8 py-2 rounded-xl'>Register</button>
      </div>

    </div>
  )
}
