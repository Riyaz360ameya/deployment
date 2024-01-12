import { createSlice } from "@reduxjs/toolkit";
const initialState = { developerDetails: {} }
const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    developerDetails: (state, action) => {
      state.developerDetails = action.payload;
    },
    resetUser: () => initialState,
    accessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});
export const { developerDetails, resetUser, accessToken } = developerSlice.actions;
export default developerSlice.reducer;








// import { createSlice } from "@reduxjs/toolkit";

// export const developerSlice = createSlice({
//   name: "developers", 
//   initialState: {
//     developerLogins: [],
//     developerTaskUpdates:[]
//   },
//   reducers: {
//     setDeveloperLogins: (state, action) => {
//       state.developerLogins = action.payload; 
//     },
//     setDevelopersTaskUpdates:(state)=>{
//       state.developerTaskUpdates = action.payload;
//     }
//   },
// });
// export const selectDevelopersTaskUpdates = (state)=>state.developers.developerTaskUpdates;
// export const {setDevelopersTaskUpdates} = developerSlice.actions;
// export const { setDeveloperLogins } = developerSlice.actions;
// export const selectDevelopersLoginData = (state) => state.developers.developerLogins;
// export default developerSlice.reducer;
