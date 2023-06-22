import React from 'react'
import { put$getDriversByType } from '../../API/drivers'
export const DriverLists = () => {
    const type = {type: "4"}
    put$getDriversByType(type).then((data) => {
        console.log(data)
    })
  return (
    <div>DriverLists Page</div>
  )
}
