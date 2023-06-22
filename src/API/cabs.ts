import axios from "axios";

const headers = {
  Authorization:
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkcml2ZXIiOiI2NDkxNDY4MTBlY2IyZTFkMWY1MzJlZmYiLCJpYXQiOjE2ODcyNDIzOTl9.ExJi-FCQ_kZWZQASUD1TtXN3ZaQ3gn8a1QGG5ao5VOc",
  "Content-Type": "application/json",
};

interface Response {
  Req: { status: number; data: Object[] | undefined };
}

export const put$getCabsByType = async (
  type: object
): Promise<Response["Req"]> => {
  try {
    const response = await axios.put("api/cab/getCabsbyType", type, {headers});
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      status: error.response?.status || 500,
      data: error.response?.data?.message || "Internal Server Error",
    };
  }
};
