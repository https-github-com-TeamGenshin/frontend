import axios from "axios";

interface createUserType {
    Req : {
        name : string | undefined,
        email_id : string | undefined,
        mobile_no : string | undefined,
        password : string | undefined,
        gender : string | undefined,
        age : number | undefined,
        location : string | undefined
    }
}

interface createDriverType {
    Req: {
        username: string;
        password: string;
        email_id: string;
        mobile_no: string;
        gender: string;
        age: number;
        imageurl: string;
        experience_years: number;
        location: string;
        vehicle_preferred: string[];
        rate_per_km: number;
        rate_per_hrs: number;
    }
}

export const post$createUser = async (data: createUserType["Req"]) => {
    try {
      const res = await axios.post("api/user/createUser", data);
      return {
        status: res.status,
        data: res.data.data,
      };
    } catch (err: any) {
      return {
        status: err.response.status,
        data: err.response,
      };
    }
}

export const post$createDriver = async (data: createDriverType["Req"]) => {
     try {
       const res = await axios.post("api/driver/createDriver", data);
       return {
         status: res.status,
         data: res.data.data,
       };
     } catch (err: any) {
       return {
         status: err.response.status,
         data: err.response,
       };
     }
}