import React, { useState } from "react";
import { Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { sessionActions } from "../../../store/session-slice";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "antd";
import { post$createRequest } from "../../../API/Request";
import { loginAction } from "../../../store/login-slice";
import { TimePicker } from "antd";
import dayjs from "dayjs";

export const TimeAndKm = () => {
  const { kms_rate, hourly_rate } = useSelector((state: any) => state.session);

  const [Kilometer, setkilometer] = useState<number>(0);
  const [Time, settime] = useState<number>(0);
  const [byKmorTime, setbyKmorTime] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionSelector = useSelector((state: any) => state.session);
  const loginSelector = useSelector((state: any) => state.login);

  function sendWhatsAppMessage(phoneNumber: string, message: string) {
    // Format the phone number by removing all non-numeric characters
    var formattedPhoneNumber = phoneNumber.replace(/\D/g, '');

    // Create the WhatsApp URL
    var url = 'https://wa.me/' + formattedPhoneNumber + '?text=' + encodeURIComponent(message);

    // Open the WhatsApp URL in a new window or tab
    window.open(url);
  }
  

  const Handle$onClick$Confirm = async () => {
    if (byKmorTime) {
      dispatch(sessionActions.addSessionKms({ kms: Kilometer }));
    }
    else dispatch(sessionActions.addSessionTimeRequired({ time_required: Time }));

    dispatch(
      sessionActions.addSessionTotalAmount({
        total_amount: byKmorTime ? hourly_rate * Kilometer : kms_rate * Time,
      })
    );
    // console.log(Kilometer, Time, sessionSelector.total_amount)
    // console.log({
    //   user_id: loginSelector._id,
    //   driver_id: sessionSelector.driver_id,
    //   type: sessionSelector.type,
    //   cab_id: sessionSelector.cab_id,
    //   start_date: sessionSelector.start_date,
    //   location: sessionSelector.location,
    //   kms: sessionSelector.kms,
    //   time_required: sessionSelector.time_required,
    //   total_amount: sessionSelector.total_amount,
    //   model_registration_no: sessionSelector.model_no,
    //   model_name: sessionSelector.model_name,
    // });
    await post$createRequest({
      user_id: loginSelector._id,
      driver_id: sessionSelector.driver_id,
      type: sessionSelector.type,
      cab_id: sessionSelector.cab_id,
      start_date: sessionSelector.start_date,
      location: sessionSelector.location,
      kms: Kilometer,
      time_required: Time,
      total_amount: byKmorTime ? hourly_rate * Kilometer : kms_rate * Time,
      model_no: sessionSelector.model_no,
      model_name: sessionSelector.model_name,
    }).then((request) => {
      // console.log(request);
      dispatch(
        loginAction.addPendingRequest({ pendingRequest: request?.data._id })
      );
      navigate("/requests");
      var phoneNumber = sessionSelector.driver_no; // Replace with the recipient's phone number
      var message = 'Hello, this is a test message!';
      sendWhatsAppMessage(phoneNumber, message);

    });
  };

  const onChange = (date: any, dateString: any) => {
    // console.log(date, dateString);
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
        showTime
        onChange={(_, dateString: any) => {
          dispatch(
            sessionActions.addSessionStartDate({ start_date: dateString })
          );
        }}
      />

      <div className="flex flex-col gap-5">
        <div className="flex gap-10">
          <div>Kilometer Rate: {hourly_rate * Kilometer}</div>
          <div>Hourly Rate: {kms_rate * Time}</div>
        </div>
        <select
          onChange={(e) =>
            setbyKmorTime(e.target.value === "Km" ? true : false)
          }
        >
          <option value="Km">By Kilometer</option>
          <option value="Time">By Time</option>
        </select>
        <div>
          Payable Amount :{" "}
          {byKmorTime ? hourly_rate * Kilometer : kms_rate * Time}
        </div>
        <Button onClick={() => Handle$onClick$Confirm()}>Confirm</Button>
      </div>
    </div>
  );
};
