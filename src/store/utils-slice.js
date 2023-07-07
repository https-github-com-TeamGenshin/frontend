import { createSlice } from "@reduxjs/toolkit";

const utilsSlice = createSlice({
    name: "utils",
    initialState: {
        showDrawer: 0,
    },
    reducers: {
        toggleDrawer(state, action) {
            state.showDrawer = action.payload.showDrawer;
        }
    }
});

export const utilsActions = utilsSlice.actions;
export default utilsSlice;
