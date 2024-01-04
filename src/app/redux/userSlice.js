import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'projectDetail',
  initialState: {
    registrationData: [],
    loginData:[],
    projectManagerLoginData:[],
    teamLeadLoginData:[],
    developerLoginData:[],
    projects:[],
    clientProjectDetails:[],
    projectManagerProjects:[],
    projectManagerTaskAssign:[],
    teamLeadProjectsDetails:[],
    teamLeadTaskAssign:[],
    developerProjectsTask:[],
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
    setTeamLeadLoginData:(state,action)=>{
      state.teamLeadLoginData = action.payload;
    },
    setDeveloperLoginData:(state,action)=>{
      state.developerLoginData = action.payload;
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
    },
    setTeamLeadTaskAssign:(state,action)=>{
      state.teamLeadTaskAssign = action.payload;
    },
    setDeveloperProjectTask:(state,action)=>{
      state.developerProjectsTask = action.payload;
    }
    
  },
});
export const selectDeveloperProjectTask = (state)=> state.user.developerProjectsTask;
export const {setDeveloperProjectTask} = userSlice.actions;
export const selectTeamLeadTaskassign = (state)=>state.user.teamLeadTaskAssign;
export const {setTeamLeadTaskAssign} = userSlice.actions;
export const selectTeamLeadsProjectDetails = (state)=>state.user.teamLeadProjectsDetails;
export const {setTeamLeadProjectDetails} = userSlice.actions;
export const selectProjectTaskAssign = (state)=> state.user.projectManagerTaskAssign;
export const {setProjectManagerTaskAssign} = userSlice.actions;
export const selectProjectManagerProjects = (state)=> state.user.projectManagerProjects;
export const {setProjectManagerProjects} = userSlice.actions;
export const selectclientProjectDetails = (state)=> state.user.clientProjectDetails;
export const {setclientProjectDetails} = userSlice.actions;
export const {setDeveloperLoginData} = userSlice.actions;
export const selectDeveloperLoginData = (state)=>state.action.developerLoginData;
export const selectTeamLeadLoginData = (state)=>state.user.teamLeadLoginData;
export const {setTeamLeadLoginData} = userSlice.actions;
export const selectProjectmanagerLogin = (state)=> state.user.projectManagerLoginData;
export const {setProjectManagerLoginData} = userSlice.actions;
export const { setRegistrationData } = userSlice.actions;
export const {setLoginData} = userSlice.actions;
export const selectLoginData = (state) => state.user.loginData;
export const selectRegistrationData = (state) => state.user.registrationData;

export default userSlice.reducer;
