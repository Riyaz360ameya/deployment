import { createSlice } from "@reduxjs/toolkit";

const initialState = { pmDetails: {}, accessToken: {} }

const pmSlice = createSlice({
    name: "pm",
    initialState,
    reducers: {
        pmDetails: (state, action) => {
            state.pmDetails = action.payload;
        },
        resetPm: () => initialState,
        accessToken: (state, action) => {
            state.accessToken = action.payload
        },
    },
});

export const { pmDetails, resetPm, accessToken } = pmSlice.actions;
export default pmSlice.reducer;