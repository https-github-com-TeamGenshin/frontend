import React, { useEffect } from 'react'
import { put$getDrivers } from '../../../API/drivers'

export const Driver = () => {

  const [drivers, setDrivers] = React.useState([])

  useEffect(() => {
    put$getDrivers(
      {
        "rating" : 1,
        "experience_years" : 1,
        "type" : "four-wheeler",
        "location" : "Pune",
        "rate_per_hrs" : true,
        "rate_per_km" : false,
      }
    ).then((res) => {
      console.log(res)
      setDrivers(res.data)
    }
    ).catch((err) => {
      console.log(err)
    }
    )
  }, [])



  return (
    <div>{
      drivers.map((driver) => {
        return (
          <div>
            <img className='w-20' src = {driver.imageurl}></img>
            <div>{driver.username}</div>
            <div>{driver.rating}</div>
            <div>{driver.experience_years}</div>
            <div>{driver.age}</div>
            <div>{driver.location}</div>
            <div>{driver.rate_per_hrs}</div>
            <div>{driver.rate_per_km}</div>
          </div>
        )
      }
      )
    }</div>
  )
}
