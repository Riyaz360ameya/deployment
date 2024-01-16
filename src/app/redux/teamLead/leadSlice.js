import { createSlice } from "@reduxjs/toolkit";

export const teamLeadSlice = createSlice({
  name: "teamLead", 
  initialState: {
    teamLeadLogins: [],
    teamLeadProjectsDetails:[],
    teamLeadTaskAssign:[],

  },
  reducers: {
    setTeamLeadLogin: (state, action) => {
      state.teamLeadLogins = action.payload; 
    },
    setTeamLeadProjectDetails:(state,action)=>{
      state.teamLeadProjectsDetails = action.payload;
    },
    setTeamLeadTaskAssign:(state,action)=>{
      state.teamLeadTaskAssign = action.payload;
    },
  },

});
export const selectTeamLeadTaskAssign = (state)=>state.teamLead.teamLeadTaskAssign;
export const {setTeamLeadTaskAssign} = teamLeadSlice.actions;
export const selectTeamLeadsProjectDetails = (state)=> state.teamLead.teamLeadProjectsDetails;
export const {setTeamLeadProjectDetails} = teamLeadSlice.actions;
export const { setTeamLeadLogin } = teamLeadSlice.actions;
export const selectTeamLeadLoginData = (state) => state.teamLead.teamLeadLogins;
export default teamLeadSlice.reducer;
