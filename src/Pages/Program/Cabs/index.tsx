import React, { useEffect, useRef, useState } from 'react'
import { put$getCabs } from '../../../API/cabs'
import { Select, message } from 'antd'
import { useSelector } from 'react-redux'

export const Cabs = () => {

  const [cabs, setcabs] = useState<any>([])

  const [kms_rate, setkms_rate] = useState<boolean>(true)
  const [fuel_type, setfuel_type] = useState<string>("")
  const [colour, setcolour] = useState<string>("")
  const [hrs_rate, sethrs_rate] = useState<boolean>(true)
  const [chunk, setchunk] = useState<number>(1)

  const {location, RequestDetails} = useSelector((state: any) => state.login)

  const totalChunk = useRef<number | undefined>(0)

  useEffect(() => {
    put$getCabs({
      "location": location,
      "type": RequestDetails.type,
      "colour": colour,
      "fuel_type": fuel_type,
      hrs_rate: hrs_rate,
      kms_rate: kms_rate,
    }, chunk)
      .then(data => {
        if(data.totalChunks === 0){
          message.error("No cabs to show")
        }
        setcabs(data.data);
        console.log(data);
        totalChunk.current = data.totalChunks

      })
      .catch(err => console.log(err))
  }, [kms_rate, hrs_rate, chunk, fuel_type, colour])



  return (
    <div>
      <div className='flex w-full justify-evenly'>
        <select onChange={(ev) => setfuel_type(ev.target.value)} name=''>
          <option value="">Select Fuel Type</option>
          <option value="electric">Electric</option>
          <option value="cng">CNG</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
        <select onChange={(ev) => setcolour(ev.target.value)} name=''>
          <option value="">Select Color</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
          <option value="Blue">Blue</option>
        </select>
        <div className='cursor-pointer' onClick={() => sethrs_rate(hrs_rate => !hrs_rate)} >{!hrs_rate ? "Hours Per Hour : High to Low" : "Hours Per Hour : Low to High"}</div>
        <div className='cursor-pointer' onClick={() => setkms_rate(kms_rate => !kms_rate)}>{!kms_rate ? "Kilometer Per Hour : High to Low" : "Kilometer Per Hour : Low to High"}</div>
        {totalChunk.current !== 0  && <select onChange={(ev) => setchunk(Number(ev.target.value))} name=''>
          {
            Array.from(Array(totalChunk.current), (_, index) => index + 1).map((item: any) => {
              return (
                <option value={item}>{item.toString()}</option>
              )
            })
          }
        </select>}
      </div>
      {
        totalChunk.current !== 0 && cabs.map((cab: any) => {
          return (
            <div className='p-3'>
              <p className='text-xl'>{cab.model_name}</p>
              <img src={cab.imageurl} alt="" />
              <p className='text-xl'>{cab.location}</p>
              <p className='text-xl'>{cab.colour}</p>
              <p className='text-xl'>{cab.fuel_type}</p>
              <p className='text-xl'>{cab.hrs_rate}</p>
              <p className='text-xl'>Kms_rate : {cab.kms_rate}</p>
            </div>
          )
        })
      }
    </div>
  )
}

