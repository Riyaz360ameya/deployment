import { createSlice } from "@reduxjs/toolkit";

export const managerSlice = createSlice({
  name: "manager", 
  initialState: {
    managerLogins: [],
    projectManagerProjects:[],
    projectManagerTaskAssign:[],
  },
  reducers: {
    setManagerLogin: (state, action) => {
      state.managerLogins = action.payload; 
    },
    setProjectManagerProjects:(state,action)=>{
        state.projectManagerProjects = action.payload;
      },
    setProjectManagerTaskAssign:(state,action)=>{
        state.projectManagerTaskAssign = action.payload;
      },
  },
});
export const selectProjectmanagerTaskAssign = (state)=>state.manager.projectManagerTaskAssign;
export const {setProjectManagerTaskAssign} = managerSlice.actions;
export const selectProjectManagerProjects = (state) => state.manager.projectManagerProjects;
export const {setProjectManagerProjects} = managerSlice.actions;
export const { setManagerLogin } = managerSlice.actions;
export const selectManagerLoginData = (state) => state.manager.managerLogins;
export default managerSlice.reducer;
