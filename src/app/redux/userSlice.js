import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'projectDetail',
  initialState: {
    registrationData: [],
    loginData:[],
    projectManagerLoginData:[],
    projects:[],
    clientProjectDetails:[],
    projectManagerProjects:[],
    projectManagerTaskAssign:[],
    teamLeadProjectsDetails:[],
    users:[],
    loading:false,
    error:null
  },
  reducers: {
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload;
    },
    setLoginData: (state,action)=>{
        state.loginData = action.payload;
    },
    setProjectManagerLoginData:(state,action)=>{
       state.projectManagerLoginData = action.payload;
    },
    setclientProjectDetails:(state,action)=>{
     state.clientProjectDetails = action.payload;
    },
    setProjectManagerProjects:(state,action)=>{
      state.projectManagerProjects = action.payload;
    },
    setProjectManagerTaskAssign:(state,action)=>{
      state.projectManagerTaskAssign = action.payload;
    },
    setTeamLeadProjectDetails:(state,action)=>{
      state.teamLeadProjectsDetails = action.payload;
    }
    
  },
});
export const selectTeamLeadsProjectDetails = (state)=>state.user.teamLeadProjectsDetails;
export const {setTeamLeadProjectDetails} = userSlice.actions;
export const selectProjectTaskAssign = (state)=> state.user.projectManagerTaskAssign;
export const {setProjectManagerTaskAssign} = userSlice.actions;
export const selectProjectManagerProjects = (state)=> state.user.projectManagerProjects;
export const {setProjectManagerProjects} = userSlice.actions;
export const selectclientProjectDetails = (state)=> state.user.clientProjectDetails;
export const {setclientProjectDetails} = userSlice.actions;
export const selectProjectmanagerLogin = (state)=> state.user.projectManagerLoginData;
export const {setProjectManagerLoginData} = userSlice.actions;
export const { setRegistrationData } = userSlice.actions;
export const {setLoginData} = userSlice.actions;
export const selectLoginData = (state) => state.user.loginData;
export const selectRegistrationData = (state) => state.user.registrationData;

export default userSlice.reducer;
