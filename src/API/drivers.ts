import axios from "axios";
import { ResponseForFiltered, ResponseForSearched } from "./interfaces";
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
    console.log(headers, filters);
    const response = await axios.put(
      `api/driver/getAllFilteredDrivers?chunk=${chunk}`,
      filters,
      {
        headers,
      }
    );
    console.log(response);
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
