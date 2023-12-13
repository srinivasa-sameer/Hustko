import { createSlice } from "@reduxjs/toolkit";
import e from "cors";

const initialState = {
  accountFetched: false,
};

const userSessionFetchedSlice = createSlice({
  name: "userSessionFetched",
  initialState,
  reducers: {
    setUserSessionFetched(state, action) {
      state.accountFetched = action.payload;
    },
  },
});

export const { setUserSessionFetched } = userSessionFetchedSlice.actions;
export default userSessionFetchedSlice.reducer;
