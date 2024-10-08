import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('logged-in-user')) || null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state, action) => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.loading = false
      state.currentUser = action.payload
    },
    signInError: (state, action) => {
      state.loading = false
    },
    logoutStart: (state, action) => {
      state.loading = true
    },
    logoutSuccess: (state, action) => {
      state.loading = false
      state.currentUser = null
    },
    logoutError: (state, action) => {
      state.loading = false
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const getUserLoadingState = (state) => state.user.loading
export const getCurrentUser = (state) => state.user.currentUser
