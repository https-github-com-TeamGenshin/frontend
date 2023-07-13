import axios from "axios";

interface validateEmail {
    Req : {
        email_id : string | undefined,
    }
}

export const post$validateEmail = async (data : validateEmail["Req"]) => {
    try{
        // console.log(data)
        const response = await axios.post("otp/validateEmail", data)
        return {
            status: 200,
            data: response.data,
        };
    }
    catch(err : any){
        if (err.message === "Network Error") {
            return {
                status: 500,
                data: "Network Error",
                };
            }
            return {
                status: err.response.status,
                data: err.response.data.message,
            };
    }
}