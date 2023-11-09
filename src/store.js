import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/userSlice'


//here we do the main mapping of all the reducers
export const store = configureStore({
  reducer: {
    users:userReducer
  },
})