import axios from "axios";

export interface loginUserType {
  Res: { username: string | undefined; password: string | undefined };
  Req: { status: number; data: Object };
}

export const post$loginUser = async (
  data: loginUserType["Res"]
): Promise<loginUserType["Req"]> => {
  try {
    // console.log(data)
    const response = await axios.post("api/user/loginUser", data);
    localStorage.setItem("token", response.data.token);
    return {
      status: 200,
      data: response.data,
    };
  } catch (err: any) {
    // console.log(err)
    return {
      status: err.response.status || 400,
      data: err.response.data.message || "Internal Server Error",
    };
  }
};

interface verifyUserTokenType {
  // Res: { username: string | undefined, password: string | undefined },
  Req: { status: number; data: string };
}

export const post$verifyUserToken = async (): Promise<
  verifyUserTokenType["Req"]
> => {
  try {
    // console.log(data)
    const response = await axios.post(
      "api/user/verifyUserToken",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response.data.data.user);
    return {
      status: 200,
      data: response.data.data,
    };
  } catch (err: any) {
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
};
