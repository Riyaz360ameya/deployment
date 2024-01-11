// import { createSlice } from "@reduxjs/toolkit";

// export const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     userLogins: [],
//   },
//   reducers: {
//     setUsersLogin: (state, action) => {
//       state.userLogins = action.payload;
//     },
//   },
// });

// export const { setUsersLogin } = userSlice.actions; 
// export const selectLoginData = (state) => state.user.userLogins;
// export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { userDetails: {} }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    resetUser: () => initialState,
    accessToken: (state, action) => {
      state.accessToken = action.payload
    },
  },
});

export const { userDetails, resetUser, accessToken } = userSlice.actions;
export default userSlice.reducer;