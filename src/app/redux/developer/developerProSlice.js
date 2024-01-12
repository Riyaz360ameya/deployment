import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  developerNewProjects: [],
  developerOngoingProjects: [],
  developerCompletedProjects: [],
};

const developerProSlice = createSlice({
  name: 'developerProSlice',
  initialState,
  reducers: {
    developerNewProjectsStore: (state, action) => {
      state.developerNewProjects = action.payload;
    },
    developerOngoingProjectsStore: (state, action) => {
      state.developerOngoingProjects = action.payload;
    },
    developerCompletedProjectsStore: (state, action) => {
      state.developerCompletedProjects = action.payload;
    },

    addNewDeveloperProject: (state, action) => {
      state.developerNewProjects.unshift(action.payload);
    },
    removeDeveloperProject: (state, action) => {
      state.developerNewProjects = state.developerNewProjects.filter((project) => project._id !== action.payload);
    },
    updateDeveloperProject: (state, action) => {
      const updatedProjectIndex = state.developerOngoingProjects.findIndex((project) => project._id === action.payload.id);
      if (updatedProjectIndex !== -1) {
        state.developerOngoingProjects[updatedProjectIndex] = action.payload.updatedProject;
      }
    },
  },
});

export const {
  developerNewProjectsStore,
  developerOngoingProjectsStore,
  developerCompletedProjectsStore,
  teamLeadTaskAssign,
  addNewDeveloperProject,
  removeDeveloperProject,
  updateDeveloperProject,
} = developerProSlice.actions;

export default developerProSlice.reducer;

