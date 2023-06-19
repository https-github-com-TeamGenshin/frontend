import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    _id: "",
    name: "",
    email_id: "",
    mobile_no: "",
    gender: "",
    age: "",
    location: "",
    allDrivers: [],
    allCabs: [],
    RequestDetails: {
        driver_id: "",
        cab_id: "",
        type: "",
        model_no: "",
        location_user: {
        latitude: 0,
        longitude: 0,
        },
        kms: 0,
        time_required: 5,
        start_date: "",
        request_status: "",
    },
    pendingRequest: false,
    isLogin: false,
  },
  reducers: {
    addRequestDetails(state,action){
        state.RequestDetails = {
            driver_id: action.payload.driver_id,
            cab_id: action.payload.cab_id,
            type: action.payload.type,
            model_no: action.payload.model_no,
            location_user: {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
            },
            kms: action.payload.kms,
            time_required: action.payload.time_required,
            start_date: action.payload.start_date,
            request_status: action.payload.request_status,
        }
    },
    addAllCabs(state,action){
        state.allCabs = action.payload.allCabs;
    },
    addAllDrivers(state,action){
        state.allDrivers = action.payload.allDrivers;
    },
    pendingRequest(state,action){
        state.pendingRequest = action.payload.pendingRequest;
    },
    userDetails(state,action){
        state.name = action.payload.name;
        state.email_id = action.payload.email_id;
        state.mobile_no = action.payload.mobile_no;
        state.gender = action.payload.gender;
        state.age = action.payload.age;
        state.location = action.payload.location;
    },
    addLogin(state, action) {
      state._id = action.payload._id;
      state.isLogin = true;
    },
    logout(state) {
      state._id = "";
      state.name = "";
        state.email_id = "";
        state.mobile_no = "";
        state.gender = "";
        state.age = "";
        state.location = "";
        state.allDrivers = [];
        state.allCabs = [];
        state.RequestDetails = {
            driver_id: "",
            cab_id: "",
            type: "",
            model_no: "",
            location_user: {
                latitude: "",
                longitude: "",
            },
            kms: "",
            time_required: "",
            start_date: "",
            request_status: "",
        }
      state.isLogin = false;
    },
  },
});

export const loginAction = loginSlice.actions;
export default loginSlice;