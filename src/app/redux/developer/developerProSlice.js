import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  developerNewTasks: [],
  developerOngoingTasks: [],
  developerCompletedTasks: [],
};

const developerProSlice = createSlice({
  name: 'developerProSlice',
  initialState,
  reducers: {
    developerNewProjectsStore: (state, action) => {
      state.developerNewTasks = action.payload;
    },
    developerOngoingProjectsStore: (state, action) => {
      state.developerOngoingTasks = action.payload;
    },
    developerCompletedProjectsStore: (state, action) => {
      state.developerCompletedTasks = action.payload;
    },
    verifierAddCompletedProjectsStore: (state, action) => {
      console.log(action.payload, '-------------------action.payload')
      // state.developerCompletedTasks = action.payload;
    },
    verifierRemoveSingleProjectsStore: (state, action) => {
      console.log(action.payload, '-------------------action.payload')
      // state.developerCompletedTasks = action.payload;
    },
    resetDevTasks: () => initialState,
  },
});

export const {
  developerNewProjectsStore,
  developerOngoingProjectsStore,
  developerCompletedProjectsStore,
  resetDevTasks
} = developerProSlice.actions;

export default developerProSlice.reducer;

