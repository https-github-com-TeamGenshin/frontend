import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    imageurl: "",
    experience_years: 0,
    vehicle_preferred: [],
    rate_per_km: 0,
    rate_per_hrs: 0,
    acceptedRequests: [],
    pendingRequests: [],
    _id: "",
    name: "",
    email_id: "",
    mobile_no: "",
    gender: "",
    age: "",
    location: "",
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
    city: "",
    vehicle_type: "",
    allDrivers: [],
    allCabs: [],
    pendingRequest: "",
    isLogin: false,
    loader: false,
    isDriver: false,
    role: "",
  },
  reducers: {
    addDriverLogin(state, action) {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email_id = action.payload.email_id;
      state.mobile_no = action.payload.mobile_no;
      state.rating = action.payload.rating;
      state.experience_years = action.payload.experience_years;
      state.location = action.payload.location;
      state.rate_per_km = action.payload.rate_per_km;
      state.rate_per_hrs = action.payload.rate_per_hrs;
      state.role = action.payload.role;
      state.isLogin = true;
    },
    addRole: (state, action) => {
      state.role = action.payload.role;
    },
    addCity(state, action) {
      state.city = action.payload.city;
    },
    addDriverID(state, action) {
      state.RequestDetails.driver_id = action.payload.driver_id;
    },
    addCabID(state, action) {
      state.RequestDetails.cab_id = action.payload.cab_id;
    },
    addType(state, action) {
      state.RequestDetails.type = action.payload.type;
    },
    addModelNo(state, action) {
      state.RequestDetails.model_no = action.payload.model_no;
    },
    addLocationUser(state, action) {
      state.RequestDetails.location_user = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    addKms(state, action) {
      state.RequestDetails.kms = action.payload.kms;
    },
    addTimeRequired(state, action) {
      state.RequestDetails.time_required = action.payload.time_required;
    },
    addStartDate(state, action) {
      state.RequestDetails.start_date = action.payload.start_date;
    },
    addRequestStatus(state, action) {
      state.RequestDetails.request_status = action.payload.request_status;
    },
    addIsDriver(state, action) {
      state.isDriver = action.payload.isDriver;
    },
    addPendingRequest(state, action) {
      state.pendingRequest = action.payload.pendingRequest;
    },
    addAllCabs(state, action) {
      state.allCabs = action.payload.allCabs;
    },
    addAllDrivers(state, action) {
      state.allDrivers = action.payload.allDrivers;
    },
    pendingRequest(state, action) {
      state.pendingRequest = action.payload.pendingRequest;
    },
    userDetails(state, action) {
      state.name = action.payload.name;
      // state.email_id = action.payload.email_id;
      // state.mobile_no = action.payload.mobile_no;
      state.gender = action.payload.gender;
      state.age = action.payload.age;
      state.location = action.payload.location;
    },
    addUserEmail(state, action) {},
    addUserMobileNo(state, action) {},
    addLogin(state, action) {
      state._id = action.payload._id;
      state.mobile_no = action.payload.mobile_no;
      state.email_id = action.payload.email_id;
      state.name = action.payload.name;
      state.location = action.payload.location;
      state.role = action.payload.role;
      state.isLogin = true;
    },
    addVehileType(state, action) {
      state.vehicle_type = action.payload.vehicle_type;
    },
    addLocation(state, action) {
      state.location = action.payload.location;
    },
    addloader(state, action) {
      state.loader = action.payload.loader;
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
      };
      state.city = "";
      state.vehicle_type = "";
      state.role = "";
      state.isLogin = false;
    },
  },
});

export const loginAction = loginSlice.actions;
export default loginSlice;
