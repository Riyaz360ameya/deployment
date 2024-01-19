import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teamLeadNewProjects: [],
  teamLeadOngoingProjects: [],
  teamLeadCompletedProjects: [],
};

const teamLeadProSlice = createSlice({
  name: 'teamLeadProSlice',
  initialState,
  reducers: {
    teamLeadNewProjectsStore: (state, action) => {
      state.teamLeadNewProjects = action.payload;
    },
    teamLeadOngoingProjectsStore: (state, action) => {
      state.teamLeadOngoingProjects = action.payload;
    },
    teamLeadCompletedProjectsStore: (state, action) => {
      state.teamLeadCompletedProjects = action.payload;
    },
    teamLeadTaskAssign: (state, action) => {
      console.log(action.payload, '---------redux--------teamLeadTaskAssign')
      // state.taskAssiginedByTeamLead = action.payload;
    },
    addNewteamLeadProject: (state, action) => {
      state.teamLeadNewProjects.unshift(action.payload);
    },
    removeteamLeadProject: (state, action) => {
      state.teamLeadNewProjects = state.teamLeadNewProjects.filter((project) => project._id !== action.payload);
    },
    updateteamLeadProject: (state, action) => {
      const updatedProjectIndex = state.teamLeadOngoingProjects.findIndex((project) => project._id === action.payload.id);
      if (updatedProjectIndex !== -1) {
        state.teamLeadOngoingProjects[updatedProjectIndex] = action.payload.updatedProject;
      }
    },
  },
});

export const {
  teamLeadNewProjectsStore,
  teamLeadOngoingProjectsStore,
  teamLeadCompletedProjectsStore,
  teamLeadTaskAssign,
  addNewteamLeadProject,
  removeteamLeadProject,
  updateteamLeadProject,
} = teamLeadProSlice.actions;

export default teamLeadProSlice.reducer;

