import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  message: null,
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
      state.currentUser = action.payload.currentUser;
      state.message = action.payload.message
    },
    authenticationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    }
  }
})

export const { authenticationStart,authenticationSuccess ,authenticationFailure} = userSlice.actions;

export default userSlice.reducer;