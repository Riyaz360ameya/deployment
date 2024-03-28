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
    developerNewTasks: (state, action) => {
      state.developerNewTasks = action.payload;
    },
    developerOngoingTasks: (state, action) => {
      state.developerOngoingTasks = action.payload;
    },
    developerCompletedTasks: (state, action) => {
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
  developerNewTasks,
  developerOngoingTasks,
  developerCompletedTasks,
  resetDevTasks
} = developerProSlice.actions;

export default developerProSlice.reducer;

