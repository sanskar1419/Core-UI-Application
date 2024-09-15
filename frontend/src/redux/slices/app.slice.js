import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: false,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSetSidebarShow: (state, action) => {
      state.sidebarShow = action.payload
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions

export const getTheme = (state) => state.app.theme
export const getSidebar = (state) => state.app.sidebarShow
export const getSidebarUnfoldable = (state) => state.app.sidebarUnfoldable
