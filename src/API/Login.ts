import axios from "axios";

interface loginUserType {
    Res: { username: string | undefined, password: string | undefined },
    Req: { status: number, data: Object }
}



export const post$loginUser = async (data: loginUserType["Res"]): Promise<loginUserType["Req"]> => {
    try {
        // console.log(data)
        const response = await axios.post("api/user/loginUser", data);
        localStorage.setItem("token", response.data.token);
        return {
            status: 200,
            data: response.data
        };
    } catch (err: any) {
        // console.log(err)
        return {
            status: err.response.status,
            data: err.response.data.message
        };
    }
};

interface verifyUserTokenType {
    // Res: { username: string | undefined, password: string | undefined },
    Req: { status: number, data: string }
}

export const get$verifyUserToken = async (): Promise<verifyUserTokenType["Req"]> => {
    try {
        // console.log(data)
        const response = await axios.post("api/user/verifyUserToken", {}, {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem(
                        "token"
                    )}`,
                }
        });
        console.log(response.data.data.user)
        return {
            status: 200,
            data: response.data.data.user
        };
    } catch (err: any) {
        // console.log(err)
        return {
            status: err.response.status,
            data: err.response.data.message
        };
    }
};