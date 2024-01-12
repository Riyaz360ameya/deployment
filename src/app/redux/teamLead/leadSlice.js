import { createSlice } from "@reduxjs/toolkit";
const initialState = { leadDetails: {} }
const teamLeadSlice = createSlice({
  name: "teamLead",
  initialState,
  reducers: {
    leadDetails: (state, action) => {
      state.leadDetails = action.payload;
    },
    resetUser: () => initialState,
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});
export const { leadDetails, resetUser, accessToken } = teamLeadSlice.actions;
export default teamLeadSlice.reducer;