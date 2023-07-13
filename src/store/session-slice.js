import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    location: {
      latitude: 0,
      longitude: 0,
    },
    user_id: "",
    driver_id: "",
    type: "",
    cab_id: "",
    model_no: "",
    kms: 0,
    no_of_seats: 0,
    time_required: 0,
    total_amount: "",
    model_name: "",
    start_date: "",
    hourly_rate: 0,
    kms_rate: 0,
    driver_no : "",
    registered: [],
    fuel_type: "",
  },
  reducers: {
    addSessionLocation(state, action) {
      state.location = action.payload.location;
    },
    addFuel_type(state,action){
      state.fuel_type = action.payload.fuel_type;
    },
    addRegistered(state,action){
      state.registered = action.payload.registered;
    },
    addSessionUserID(state, action) {
      state.user_id = action.payload.user_id;
    },
    addSessionDriverID(state, action) {
      state.driver_id = action.payload.driver_id;
    },
    addSessionType(state, action) {
      state.type = action.payload.type;
    },
    addSessionCabID(state, action) {
      state.cab_id = action.payload.cab_id;
    },
    addSessionNumberOfSeats(state,action){
      state.no_of_seats = action.payload.no_of_seats;
    },
    addSessionModelNo(state, action) {
      state.model_no = action.payload.model_no;
    },
    addSessionKms(state, action) {
      state.kms = action.payload.kms;
    },
    addSessionModelName(state, action) {
      state.model_name = action.payload.model_name;
    },
    addSessionTimeRequired(state, action) {
      state.time_required = action.payload.time_required;
    },
    addSessionTotalAmount(state, action) {
      state.total_amount = action.payload.total_amount;
    },
    addSessionStartDate(state, action) {
      state.start_date = action.payload.start_date;
    },
    addSessionHourlyRate(state, action) {
      state.hourly_rate = action.payload.hourly_rate;
    },
    addSessionKmsRate(state, action) {
      state.kms_rate = action.payload.kms_rate;
    },
    addSessionDriverNo(state, action) {
      state.driver_no = action.payload.driver_no;
    },
    removeSessionDetails(state) {
      state.location = {
        latitude: 0,
        longitude: 0,
      };
      state.user_id = "";
      state.driver_id = "";
      state.type = "";
      state.cab_id = "";
      state.model_no = "";
      state.kms = "";
      state.time_required = "";
      state.total_amount = "";
      state.model_name = "";
      state.start_date = "";
      state.hourly_rate = 0;
      state.kms_rate = 0;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
