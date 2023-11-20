import { configureStore } from '@reduxjs/toolkit'
import projectDetail  from './userSlice'

export const store = configureStore({
  reducer: {
    app:projectDetail
  },
})