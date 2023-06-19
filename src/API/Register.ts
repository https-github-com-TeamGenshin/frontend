import axios from "axios";

interface createUserType {
    Req : {
        name : string,
        email : string,
        mobile_no : string,
        password : string,
        gender : string,
        age : string,
        location : string
    }
}

export const post$createUser = async (data : createUserType["Req"]) => {
    await axios.post("api/user/createUser", {
        name: "AjinkyaP",
        email_id : "ajinkya@gmail.com",
        mobile_no : "9876543210",
        password : "12345678901",
        gender : "Male", 
        age : 30, 
        location : "Pune"
    }).then((data) => console.log(data))
        .catch((err) => console.log(err.response.data.message))
}