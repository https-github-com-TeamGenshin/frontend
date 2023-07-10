import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: "register",
    initialState: {
        isDriver: false,
        isEmailVerify: false,
        isPhoneVerify: false,
        driver: {
            "username": "",
            "age": "",
            "location": "",
            "gender": "",
            "password": "",
            "email_id": "",
            "mobile_no": "",
            "imageurl": "",
            "experience_years": 0,
            "vehicle_preferred": [],
            "rate_per_km": 0,
            "rate_per_hrs": 0
        },
        user: {
            "name": "",
            "mobile_no": "",
            "email_id": "",
            "password": "",
            "gender": "",
            "age": 0,
            "location": ""
        }
    },
    reducers: {
        addDriverUsername(state, action) {
            state.driver.username = action.payload.username;
        },
        addDriverAge(state, action) {
            state.driver.age = action.payload.age;
        },
        addDriverLocation(state, action) {
            state.driver.location = action.payload.location;
        },
        addDriverGender(state, action) {
            state.driver.gender = action.payload.gender;
        },
        addDriverPassword(state, action) {
            state.driver.password = action.payload.password;
        },
        addDriverEmailID(state, action) {
            state.driver.email_id = action.payload.email_id;
        },
        addDriverMobileNo(state, action) {
            state.driver.mobile_no = action.payload.mobile_no;
        },
        addDriverImageURL(state, action) {
            state.driver.imageurl = action.payload.imageurl;
        },
        addDriverExperienceYears(state, action) {
            state.driver.experience_years = action.payload.experience_years;
        },
        addDriverVehiclePreferred(state, action) {
            state.driver.vehicle_preferred = action.payload.vehicle_preferred;
        },
        addDriverRatePerKM(state, action) {
            state.driver.rate_per_km = action.payload.rate_per_km;
        },
        addDriverRatePerHrs(state, action) {
            state.driver.rate_per_hrs = action.payload.rate_per_hrs;
        },



        addUsername(state, action) {
            state.user.name = action.payload.name;
        },
        addUserAge(state, action) {
            state.user.age = action.payload.age;
        },
        addUserLocation(state, action) {
            state.user.location = action.payload.location;
        },
        addUserGender(state, action) {
            state.user.gender = action.payload.gender;
        },
        addUserPassword(state, action) {
            state.user.password = action.payload.password;
        },
        addUserEmailID(state, action) {
            state.user.email_id = action.payload.email_id;
        },
        addUserMobileNo(state, action) {
            state.user.mobile_no = action.payload.mobile_no;
        },

        addIsDriver(state, action) {
            state.isDriver = action.payload.isDriver;
        },
        addEmailVerfiy(state, action) {
            state.isEmailVerify = action.payload.isEmailVerify;
        },
        addPhoneVerfiy(state, action) {
            state.isPhoneVerify = action.payload.isPhoneVerify;
        },
    },
});

export const registerActions = registerSlice.actions;
export default registerSlice;