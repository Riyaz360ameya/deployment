import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
    name:"users",
    initialState:{
        userLogins:[],
    },
    reducers:{
        setUsersLogin:(state,action)=>{
            state.userLogins = action.payload;
        }
    }
})