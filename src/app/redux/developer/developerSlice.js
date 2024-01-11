import { createSlice } from "@reduxjs/toolkit";

export const developerSlice = createSlice({
  name: "developers", 
  initialState: {
    developerLogins: [],
    developerTaskUpdates:[]
  },
  reducers: {
    setDeveloperLogins: (state, action) => {
      state.developerLogins = action.payload; 
    },
    setDevelopersTaskUpdates:(state)=>{
      state.developerTaskUpdates = action.payload;
    }
  },
});
export const selectDevelopersTaskUpdates = (state)=>state.developers.developerTaskUpdates;
export const {setDevelopersTaskUpdates} = developerSlice.actions;
export const { setDeveloperLogins } = developerSlice.actions;
export const selectDevelopersLoginData = (state) => state.developers.developerLogins;
export default developerSlice.reducer;
