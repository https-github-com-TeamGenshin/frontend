import { useState } from "react";
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
  const [byKmorTime, setbyKmorTime] = useState<boolean>(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionSelector = useSelector((state: any) => state.session);
  const loginSelector = useSelector((state: any) => state.login);

  function sendWhatsAppMessage(phoneNumber: string, message: string) {
    var formattedPhoneNumber = phoneNumber.replace(/\D/g, "");
    var url =
      "https://wa.me/" +
      formattedPhoneNumber +
      "?text=" +
      encodeURIComponent(message);
    window.open(url);
  }

  const Handle$onClick$Confirm = async () => {
    if ((!Kilometer || !Time) && !sessionSelector.start_date) return;
    if (byKmorTime) {
      dispatch(sessionActions.addSessionKms({ kms: Kilometer }));
    } else
      dispatch(sessionActions.addSessionTimeRequired({ time_required: Time }));

    dispatch(
      sessionActions.addSessionTotalAmount({
        total_amount: byKmorTime ? hourly_rate * Kilometer : kms_rate * Time,
      })
    );
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
      var message = "Hello, this is a test message!";
      sendWhatsAppMessage(phoneNumber, message);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen w-screen">
      <div className="text-xl">Set Time and Kilometers</div>
      <div className="flex flex-col gap-10">
        <Input
          onChange={(ev) => setkilometer(Number(ev.target.value))}
          type="number"
          placeholder="Kilometers"
          className="w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Input
          onChange={(ev) => settime(Number(ev.target.value))}
          type="number"
          placeholder="Time"
          className="w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <DatePicker
        showTime
        onChange={(_, dateString: any) => {
          dispatch(
            sessionActions.addSessionStartDate({ start_date: dateString })
          );
        }}
        className="w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div>
        <p className="mb-2 ">Select Rate for Journey</p>
        <select
          onChange={(e) => setbyKmorTime(e.target.value === "Km")}
          className="w-48 p-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Km">By Kilometer</option>
          <option value="Time">By Time</option>
        </select>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <div className="flex gap-10">
          <div>Kilometer Rate: {byKmorTime && hourly_rate * Kilometer}</div>
          <div>Hourly Rate: {!byKmorTime && kms_rate * Time}</div>
        </div>

        {/* <div>
          Payable Amount:{" "}
          {byKmorTime ? hourly_rate * Kilometer : kms_rate * Time}
        </div> */}
        <Button
          onClick={() => Handle$onClick$Confirm()}
          className="px-12  bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md"
        >
          CONFIRM
        </Button>
      </div>
    </div>
  );
};
