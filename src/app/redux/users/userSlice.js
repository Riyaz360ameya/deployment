import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userLogins: [],
  },
  reducers: {
    setUsersLogin: (state, action) => {
      state.userLogins = action.payload;
    },
  },
});

export const { setUsersLogin } = userSlice.actions; 
export const selectLoginData = (state) => state.user.userLogins;
export default userSlice.reducer;
