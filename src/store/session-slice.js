import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
    name: "session",
    initialState: {
        "location": {
            "latitude": 0,
            "longitude": 0
        },
        "user_id": "",
        "driver_id": "",
        "type": "",
        "cab_id": "",
        "model_no": "",
        "kms": "",
        "time_required": "",
        "total_amount": "",
        "start_date": "",
        "hourly_rate": 0,
        "kms_rate": 0,

    },
    reducers: {
        addSessionLocation(state, action) {
            state.location = action.payload.location;
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
        addSessionModelNo(state, action) {
            state.model_no = action.payload.model_no;
        },
        addSessionKms(state, action) {
            state.kms = action.payload.kms;
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
        }
    },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice