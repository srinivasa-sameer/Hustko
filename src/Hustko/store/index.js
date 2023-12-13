import { configureStore } from "@reduxjs/toolkit";
import userSessionReducer from "../Login/HustkoLogin/SignIn/userSessionReducer";

const store = configureStore({
  reducer: {
    userSessionReducer,
  },
});

export default store;
