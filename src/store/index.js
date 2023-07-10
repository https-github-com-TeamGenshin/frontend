import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./login-slice"
import sessionSlice from "./session-slice"
import utilsSlice from "./utils-slice"
import registerSlice from "./register-slice"
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    session: sessionSlice.reducer,
    utils: utilsSlice.reducer,
    register: registerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;