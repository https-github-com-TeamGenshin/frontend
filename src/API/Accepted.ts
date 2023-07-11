import axios from "axios";
import { Response } from "./interfaces";

// :Promise<Accepted["Res"]>
export const get$AcceptedRequestsOfUser = async (): Promise<Response["Req"]> => {
  try {
    const response = await axios.get("api/user/getAcceptedRequest", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

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


export const post$AcceptedOneRequestOfUser = async (_id: string): Promise<Response["Req"]>  => {
  try{
    const response = await axios.post("api/user/getOneAcceptedRequest", _id,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });return {
      status: 200,
      data: response.data.data,
    };
  }catch(error:any){return {
      status: error.response?.status || 400,
      data: error.response || "Internal Server Error",
    };}
}