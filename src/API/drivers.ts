import axios from "axios";
import {ResponseForFiltered,ResponseForSearched} from "./interfaces";

const headers = {
  Authorization:
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkcml2ZXIiOiI2NDkxNDY4MTBlY2IyZTFkMWY1MzJlZmYiLCJpYXQiOjE2ODcyNDIzOTl9.ExJi-FCQ_kZWZQASUD1TtXN3ZaQ3gn8a1QGG5ao5VOc",
  "Content-Type": "application/json",
};



export const put$getDrivers = async (
  filters: object
): Promise<ResponseForFiltered["Req"]> => {
  try {
    console.log(headers, filters);
    const response = await axios.put("api/driver/getAllFilteredDrivers", filters, {
      headers,
    });
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
