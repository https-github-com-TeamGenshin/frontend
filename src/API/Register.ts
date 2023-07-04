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

export const post$createUser = async (data : createUserType["Req"]) => {
    await axios.post("api/user/createUser", data).then((data) => console.log(data))
        .catch((err) => console.log(err.response.data.message))
}