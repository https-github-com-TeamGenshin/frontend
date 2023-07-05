import axios from "axios";
import {ResponseForFiltered,ResponseForSearched} from "./interfaces";
const headers = {
  Authorization:
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkcml2ZXIiOiI2NDkxNDY4MTBlY2IyZTFkMWY1MzJlZmYiLCJpYXQiOjE2ODcyNDIzOTl9.ExJi-FCQ_kZWZQASUD1TtXN3ZaQ3gn8a1QGG5ao5VOc",
  "Content-Type": "application/json",
};



export const put$getCabs = async (
  filters: object,
  chunk: number
): Promise<ResponseForFiltered["Req"]> => {
  try {
    const response = await axios.put(
      `api/cab/getAllFilteredCabs?chunk=${chunk}`,
      filters,
      {
        headers,
      }
    );

    return {
      status: response.status,
      totalChunks: response.data.totalChunks,
      data: response.data.chunkData,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      totalChunks: 0,
      data: error.response?.data?.message || "Internal Server Error",
    };
  }
};

export const put$searchCabs = async (
  search: string
): Promise<ResponseForSearched["Req"]> => {
  try {
    const response = await axios.put("api/cab/getAllFilteredCabs", search, {
      headers,
    });

    return {
      status: response.status,
      previouslyAccepted: response.data.previouslyAccepted,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      previouslyAccepted: [],
      data: error.response?.data?.message || "Internal Server Error",
    };
  }
};
