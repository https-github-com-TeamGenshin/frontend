import axios from "axios";
import { Response } from "./interfaces";
const headers = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

interface createRequestType {
  Req: {
    user_id: string;
    driver_id: string;
    cab_id: string;
    type: string;
    model_name: string;
    model_no: string;
    location: Location;
    kms: number | null;
    time_required: number | null;
    start_date: Date;
    total_amount: number;
  };
}

export const post$createRequest = async (data: createRequestType["Req"]) => {
  try {
    // console.log("Hit")
    const res = await axios
      .post("api/request/createRequest", data, {
        headers,
      })
      .catch((err) => console.log(err));

    // console.log(res?.data);
    return res?.data;
  } catch (e) {
    return null;
  }
};

export const post$getRequest = async (data: { request_id: string }) => {
  try {
    const res = await axios
      .post("api/request/getRequests", data, {
        headers,
      })
      .catch((err) => console.log(err));

    //console.log(res?.data);
    return res?.data;
  } catch (e) {
    return null;
  }
};

