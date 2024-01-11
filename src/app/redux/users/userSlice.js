import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userLogins: [],
    clientProjectDetails:[],
  },
  reducers: {
    setUsersLogin: (state, action) => {
      state.userLogins = action.payload;
    },
    setclientProjectDetails:(state,action)=>{
        state.clientProjectDetails = action.payload;
       },
  },
});
export const selectclientProjectDetails = (state)=>state.user.userLogins
export const {setclientProjectDetails} = userSlice.actions;
export const { setUsersLogin } = userSlice.actions; 
export const selectLoginData = (state) => state.user.userLogins;
export default userSlice.reducer;
