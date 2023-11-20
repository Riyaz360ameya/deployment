const { createSlice } = require("@reduxjs/toolkit");

export const projectDetail = createSlice({
    name:"projectDetail",
    initialState:{
        users:[],
        loading:false,
        error:null
    }
})

export default projectDetail.reducer;