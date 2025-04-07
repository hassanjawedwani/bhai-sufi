import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticationStart: (state) => {
      state.loading = true;
    },
    authenticationSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    authenticationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
  }
})

export const { authenticationStart,authenticationSuccess ,authenticationFailure} = userSlice.actions;

export default userSlice.reducer;