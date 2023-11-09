import { createSlice } from '@reduxjs/toolkit'
import shortid from 'shortid'


//contains all the user list
const initialState = {
    users:[]
}


//this is the reducer
export const counterSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    addUser: (state,action) => {
      state.users.push({...action.payload,id:shortid.generate()})
    },
    removeUser: (state,action) => {
      // state.users.push(action.payload)
      state.users = state.users.filter((v,i)=>v.id!==action.id)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = counterSlice.actions

export default counterSlice.reducer