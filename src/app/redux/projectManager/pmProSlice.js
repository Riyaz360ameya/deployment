import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pmNewProjects: [],
    pmOngoingProjects: [],
    pmCompletedProjects: [],
}
const pmProSlice = createSlice({
    name: 'pmProSlice',
    initialState,
    reducers: {
        pmNewProjects: (state, action) => {
            state.pmNewProjects = action.payload
        },
        pmOngoingProjects: (state, action) => {
            state.pmOngoingProjects = action.payload
        },
        pmCompletedProjects: (state, action) => {
            state.pmCompletedProjects = action.payload
        },
        leadTaskAssign: (state, action) => {
            // its mean need to remove the a specific project from the newProjects
            console.log(action.payload, '-----------projectIdToRemove')
            state.pmNewProjects = state.pmNewProjects.filter((data) => data._id !== action.payload)
        },
        addNewOnGoProject: (state, action) => {
            state.pmOngoingProjects.unshift(action.payload)
        },
        completePmProject: (state, action) => {
            state.pmOngoingProjects = state.pmNewProjects.filter((data) => data._id  !== action.payload)
        },
        updatePmProject: (state, action) => {
            const updatedProjectIndex = state.pmOngoingProjects.findIndex(project => project._id === action.payload.id);
            const projectIndex = state.pmOngoingProjects.findIndex(project => project._id === action.payload.id);
            if (updatedProjectIndex !== -1) {
                state.pmOngoingProjects[updatedProjectIndex] = action.payload.updatedProject
                state.books[projectIndex] = action.payload.updatedProject
            }
        },
        resetPmProject: () => initialState,
    }
})

export const { pmNewProjects, pmOngoingProjects, pmCompletedProjects, addNewOnGoProject, completePmProject, updatePmProject, resetPmProject, leadTaskAssign } = pmProSlice.actions;
export default pmProSlice.reducer;
