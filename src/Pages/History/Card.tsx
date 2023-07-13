import React from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const BeforeOrAfter = (dateTime: string) => {
    const currentDateTime = new Date();

    // Convert the given datetime string to a Date object
    const givenDateTime = new Date(dateTime);

    // Compare the two dates
    if (givenDateTime < currentDateTime) {
        return -1
    } else if (givenDateTime > currentDateTime) {
        return 1
    } else {
        return 0
    }
}


export const Card = ({ data, bora } : {data : any, bora : number}) => {

    const dateTime = data.start_date

    const [show, setshow] = React.useState<boolean>(false)

    return (
        <div>
            <div className={` ${BeforeOrAfter(dateTime) === bora && "hidden"} w-full flex flex-col items-center justify-center`}>
                <div className="bg-white w-[80vw] p-5 flex justify-between items-center gap-10">
                    <div className="bg-slate-600 w-16 h-16 rounded-full"></div>
                    <div>
                        <div>Driver Name : { data.driver_name }</div>
                        <div>Start Date : {data.start_date}</div>
                        <div>Register Number : {data.model_registration_no }</div>
                    </div>
                    {!show && <div onClick={() => { setshow(true); }} className='text-3xl cursor-pointer'><DownOutlined /></div>}
                    {show && <div onClick={() => setshow(false)} className='text-3xl cursor-pointer'><UpOutlined /></div>}

                </div>
                {show && <div className=' bg-white w-[80vw]'>
                    <div>
                        <p>type</p>
                        <p>car name</p>
                        <p>payable amount</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}
