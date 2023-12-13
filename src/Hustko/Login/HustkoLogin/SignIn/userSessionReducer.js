import { createSlice } from "@reduxjs/toolkit";

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
