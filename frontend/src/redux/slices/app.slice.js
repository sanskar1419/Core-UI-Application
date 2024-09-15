import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  theme: 'light',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
})

export const appReducer = appSlice.reducer
export const appActions = appSlice.actions

export const getTheme = (state) => state.app.theme
export const getSidebar = (state) => state.app.sidebarShow
