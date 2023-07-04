import axios from "axios";

export const setBaseURL = () => {
  axios.defaults.baseURL = "http://localhost:5000/";
};
