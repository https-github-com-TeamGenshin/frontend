import React, { useState } from "react";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { sessionActions } from "../../../store/session-slice";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { post$createRequest } from "../../../API/Request";
import { loginAction } from "../../../store/login-slice";

export const TimeAndKm = () => {
  const { kms_rate, hourly_rate } = useSelector((state: any) => state.session);

  const [Kilometer, setkilometer] = useState<number>(0);
  const [Time, settime] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionSelector = useSelector((state: any) => state.session);

  const Handle$onClick$Confirm = async () => {
    dispatch(sessionActions.addSessionKms({ kms: Kilometer }));
    dispatch(sessionActions.addSessionTimeRequired({ time_required: Time }));
    dispatch(
      sessionActions.addSessionTotalAmount({
        total_amount: kms_rate * Kilometer + hourly_rate * Time,
      })
    );
    console.log({
      user_id: sessionSelector.user_id,
      driver_id: sessionSelector.driver_id,
      type: sessionSelector.type,
      cab_id: sessionSelector.cab_id,
      start_date: sessionSelector.start_date,
      location: sessionSelector.location,
      kms: sessionSelector.kms,
      time_required: sessionSelector.time_required,
      total_amount: sessionSelector.total_amount,
      model_registration_no: sessionSelector.model_no,
      model_name: sessionSelector.model_name,
    });
    const request: any = await post$createRequest({
      user_id: sessionSelector.user_id,
      driver_id: sessionSelector.driver_id,
      type: sessionSelector.type,
      cab_id: sessionSelector.cab_id,
      start_date: sessionSelector.start_date,
      location: sessionSelector.location,
      kms: sessionSelector.kms,
      time_required: sessionSelector.time_required,
      total_amount: sessionSelector.total_amount,
      model_no: sessionSelector.model_no,
      model_name: sessionSelector.model_name,
    });
    dispatch(
      loginAction.addPendingRequest({ pendingRequest: request.data._id })
    );
  };

  const onChange = (date: any, dateString: any) => {
    console.log(date, dateString);
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <div>Set Time and Kilometers</div>
      <div className="flex flex-col gap-10">
        <Input
          onChange={(ev) => setkilometer(Number(ev.target.value))}
          type="number"
          placeholder="Kilomters"
        />
        <Input
          onChange={(ev) => settime(Number(ev.target.value))}
          type="number"
          placeholder="Time"
        />
      </div>
      <DatePicker
        onChange={(_, dateString: any) => {
          dispatch(
            sessionActions.addSessionStartDate({ start_date: dateString })
          );
        }}
      />
      <div className="flex flex-col gap-10">
        <div>Hourly Rate: {hourly_rate * Kilometer}</div>
        <div>Kilometer Rate: {kms_rate * Time}</div>
        <div>Total : {hourly_rate * Kilometer + kms_rate * Time}</div>
        <Button onClick={() => Handle$onClick$Confirm()}>Confirm</Button>
      </div>
    </div>
  );
};
