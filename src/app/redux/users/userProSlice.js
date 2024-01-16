import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userNewProjects: [],
    userOngoingProjects: [],
    userCompletedProjects: [],
}
const userProSlice = createSlice({
    name: 'userProSlice',
    initialState,
    reducers: {
        userNewProjects: (state, action) => {
            state.userNewProjects = action.payload
        },
        userOngoingProjects: (state, action) => {
            state.userOngoingProjects = action.payload
        },
        userCompletedProjects: (state, action) => {
            state.userCompletedProjects = action.payload
        },
        addNewUserProject: (state, action) => {
            state.userNewProjects.unshift(action.payload)
        },
        removeUserProject: (state, action) => {
            state.userNewProjects = state.userNewProjects.filter((std) => std._id !== action.payload)
        },
        updateUserProject: (state, action) => {
            const updatedProjectIndex = state.userOngoingProjects.findIndex(project => project._id === action.payload.id);
            const projectIndex = state.userOngoingProjects.findIndex(project => project._id === action.payload.id);
            if (updatedProjectIndex !== -1) {
                state.userOngoingProjects[updatedProjectIndex] = action.payload.updatedProject
                state.books[projectIndex] = action.payload.updatedProject
            }
        }
    }
})

export const { userNewProjects, userOngoingProjects, userCompletedProjects, addNewUserProject, removeUserProject, updateUserProject } = userProSlice.actions;
export default userProSlice.reducer;
