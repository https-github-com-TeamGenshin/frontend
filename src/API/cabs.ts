import axios from "axios";
import { ResponseForFiltered, ResponseForSearched } from "./interfaces";
const headers = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
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

// export const post$createCab = async ( data: Cab ): Promise