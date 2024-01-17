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
            console.log(action.payload, '-----------projectIdToRemove')
            console.log('Before Removal:---', state.pmNewProjects.map(project => ({ ...project, projectId: { ...project.projectId } }))); // Log a copy of the state before removal
            const projectIdToRemove = action.payload;
            state.pmNewProjects = state.pmNewProjects.filter((project) => project._id !== projectIdToRemove);
            console.log('after Removal:---', state.pmNewProjects.map(project => ({ ...project, projectId: { ...project.projectId } }))); // Log a copy of the state before removal
            // state.pmNewProjects = state.pmNewProjects.filter((std) => std.projectId._id !== action.payload)
            // console.log(s,'-------------2')
        },
        addNewOnGoProject: (state, action) => {
            state.pmOngoingProjects.unshift(action.payload)
        },
        removePmProject: (state, action) => {
            state.pmNewProjects = state.pmNewProjects.filter((std) => std._id !== action.payload)
        },
        updatePmProject: (state, action) => {
            const updatedProjectIndex = state.pmOngoingProjects.findIndex(project => project._id === action.payload.id);
            const projectIndex = state.pmOngoingProjects.findIndex(project => project._id === action.payload.id);
            if (updatedProjectIndex !== -1) {
                state.pmOngoingProjects[updatedProjectIndex] = action.payload.updatedProject
                state.books[projectIndex] = action.payload.updatedProject
            }
        },
        resetProject: () => initialState,
    }
})

export const { pmNewProjects, pmOngoingProjects, pmCompletedProjects, addNewOnGoProject, removePmProject, updatePmProject, resetProject, leadTaskAssign } = pmProSlice.actions;
export default pmProSlice.reducer;
