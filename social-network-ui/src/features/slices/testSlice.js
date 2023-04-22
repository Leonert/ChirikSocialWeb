import { createSlice } from '@reduxjs/toolkit'

const testSlice = createSlice({
  name: 'test',
  initialState: {
    status: false
  },
  reducers: {
    changeStatus: (state, action) => {
      state.status = !state.status
    }
  }
})

export const testReducer = testSlice.reducer
export const { changeStatus } = testSlice.actions
