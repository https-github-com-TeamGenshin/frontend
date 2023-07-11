import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    type: "",
    location: "",
    fourChunkNumbers: [],
    threeChunkNumbers: [],
    fourChunkNumbers: [],
    miniChunkNumbers: [],
    fourCabs: [],
    threeCabs: [],
    twoCabs:[],
    miniCabs:[]
  },
  reducers: {
    
  }
});

export const adminAction = adminSlice.actions;
export default adminSlice;
