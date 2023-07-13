import axios from "axios";
import { Response } from "./interfaces";
import { ResponseForFiltered, ResponseForSearched } from "./interfaces";
const headers = {
  Authorization: `bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
};

export interface ResponseData {
  Req: { status: number; data: Object | undefined };
}

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

export const put$getOneCab = async (data: any): Promise<ResponseData["Req"]> => {
  try {
    const response = await axios.put("api/cab/getOneCab", data, { headers });
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
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

export const post$createCab = async (data: any): Promise<Response["Req"]> => {
  try {
    const response = await axios.post("api/cab/createCab", data, { headers });
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };
  }
};

export const put$updateCab = async (data: any): Promise<Response["Req"]> => {
  try {
    const response = await axios.put("api/cab/updateCab", data, { headers });
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };
  }
};

export const put$deleteCabDetails = async (data: any): Promise<Response["Req"]> => {
  try {
    const response = await axios.put("api/cab/deleteCabDetails", data, { headers });
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };
  }

};
export const put$deleteOneCabDetails = async (data: any): Promise<Response["Req"]> => {
  try {
    const response = await axios.put("api/cab/deleteOneCabDetails", data, { headers });
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };
  }
};