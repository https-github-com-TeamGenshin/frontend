import axios from "axios";
import { ResponseForFiltered } from "./interfaces";
import { loginUserType } from "./Login";

const headers = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

export const post$loginDriver = async (
  body: loginUserType["Res"]
): Promise<loginUserType["Req"]> => {
  try {
    const response = await axios.post(`api/driver/loginDriver`, body);
    // console.log(response)
    localStorage.setItem("token", response.data.token);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };
  }
};

export const put$getDrivers = async (
  filters: object,
  chunk: number
): Promise<ResponseForFiltered["Req"]> => {
  try {
    // console.log(headers, filters);
    const response = await axios.put(
      `api/driver/getAllFilteredDrivers?chunk=${chunk}`,
      filters,
      {
        headers,
      }
    );
    // console.log(response);
    return {
      status: response.status,
      totalChunks: response.data.totalChunks,
      data: response.data.chunkData,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      totalChunks: 0,
      data: error.response || "Internal Server Error",
    };
  }
};

export const get$getRequest = async () => {
  // console.log(headers)
  try {
    const res = await axios.get("api/driver/pending", {
      headers,
    });
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const get$getAccepted = async () => {
  try {
    const res = await axios.get("api/driver/accepted", {
      headers,
    });
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const post$RequestAccepted = async (data: any) => {
  try {
    const res = await axios.put("api/request/acceptRequest", data, {
      headers,
    });
    // console.log(res)
    return {
      status: res.data.data.status,
      data: res.data.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const post$RequestRejected = async (data: any) => {
  try {
    const res = await axios.put("api/request/rejectRequest", data, {
      headers,
    });
    // console.log(res);
    return {
      status: res.data.data.status,
      data: res.data.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const get$getOneDriver = async () => {
  try {
    const res = await axios.get("api/driver/getOneDriver", {
      headers,
    });
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const put$updateDriver = async (data: any) => {
  try {
    const res = await axios.put("api/driver/updateDriver", data, { headers });
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};

export const put$deleteDriver = async (data: any) => {
  try {
    const res = await axios.put("api/driver/deleteDriver", data, { headers });
    return {
      status: res.status,
      data: res.data.data,
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      data: err.response.data.message,
    };
  }
};
