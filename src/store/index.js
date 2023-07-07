import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice"
import sessionSlice from "./session-slice"
import utilsSlice from "./utils-slice"
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    session: sessionSlice.reducer,
    utils: utilsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;