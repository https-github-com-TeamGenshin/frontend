import React, { useState } from 'react'
import { Loader } from '../../../Components/Loader/Loader';

export const Card = ({ cid, id, setcid, cab, Handler }: { cid: number, Handler: any, id: number, setcid: any, cab: any }) => {


    const [loader, setloader] = useState<boolean>(true);

    setTimeout(() => {
        setloader(false);
    }, 5000);

    return (
        <div className='relative  w-84 h-56'>
            {
                loader && <Loader loader={loader} />
            }
            <div onMouseEnter={() => setcid(id)} onMouseLeave={() => setcid(-1)}
                style={{
                    backgroundColor: "rgba(17, 25, 40, 0.20)",
                    backdropFilter: "blur(16px) saturate(200%)",
                }}
                className="relative cursor-pointer rounded-xl p-3"
                onClick={() => Handler(cab)}
            >
                <img onLoad={() => setloader(false)} className="w-72 h-44" src={cab.imageurl} alt="" />
                <div className="flex w-full justify-between">
                    <p className="text-sm">{cab.model_name}</p>
                    <p className="text-sm">{cab.fuel_type}</p>
                    <p style={{ backgroundColor: cab.colour }} className='absolute top-5 right-5 w-5 h-5 rounded-full'></p>
                </div>
                <div className={` rounded-xl opacity-80 flex flex-col justify-center items-center gap-5 w-full h-full text-white absolute top-0 left-0 ${cid === id ? "" : "hidden"} bg-slate-700 `}>
                    <p>Number of Available : {cab.no_of_seats}</p>
                    <p>Hourly Rate : {cab.hrs_rate}</p>
                    <p>Kilometer Rate : {cab.kms_rate}</p>
                    <p>Number of Available : {cab.no_of_available}</p>
                    <p></p>
                </div>
            </div>
        </div>
    )
}
