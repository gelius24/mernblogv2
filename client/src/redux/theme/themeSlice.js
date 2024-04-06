import { createSlice } from '@reduxjs/toolkit'

// initiale state
const initialState = {theme: 'dark'}


// createSlice function with state, initial state and reducers

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
})

// export  the action
export const {toogleTheme} = themeSlice.actions;

// export the reducer to add to store
export default themeSlice.reducer;