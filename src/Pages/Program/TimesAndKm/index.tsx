import React, { useState } from 'react'
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { sessionActions } from '../../../store/session-slice';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from 'antd';

export const TimeAndKm = () => {

  const { kms_rate, hourly_rate } = useSelector((state: any) => state.session)

  const [Kilometer, setkilometer] = useState<number>(0)
  const [Time, settime] = useState<number>(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const Handle$onClick$Confirm = () => {
    dispatch(sessionActions.addSessionKms({ kms: Kilometer }))
    dispatch(sessionActions.addSessionTimeRequired({ time_required: Time }))
    dispatch(sessionActions.addSessionTotalAmount({ total_amount: kms_rate * Kilometer + hourly_rate * Time }))
    navigate("/maps")
  }

  const onChange = (date : any, dateString : any) => {
    console.log(date, dateString);
  };

  return (
    <div className='flex flex-col items-center gap-10'>
      <div>Set Time and Kilometers</div>
      <div className='flex flex-col gap-10'>
        <Input onChange={(ev) => setkilometer(Number(ev.target.value))} type='number' placeholder="Kilomters" />
        <Input onChange={(ev) => settime(Number(ev.target.value))} type='number' placeholder="Time" />
      </div>
      <DatePicker onChange={(_, dateString : any) => {dispatch(sessionActions.addSessionStartDate({start_date : dateString}))}} />
      <div className='flex flex-col gap-10'>
        <div>Hourly Rate: {hourly_rate * Kilometer}</div>
        <div>Kilometer Rate: {kms_rate * Time}</div>
        <div>Total : {hourly_rate * Kilometer + kms_rate * Time}</div>
        <Button onClick={() => Handle$onClick$Confirm()}>Confirm</Button>
      </div>
    </div>
  )
}
