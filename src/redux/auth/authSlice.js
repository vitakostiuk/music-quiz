import { createSlice } from '@reduxjs/toolkit';
import { signup, signin } from './authOperations';

const initialState = {
  userEmail: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // REDUCER FOR SIGN_UP
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.userEmail = payload.user.email;
        state.token = payload.token;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR SIGNIN
      .addCase(signin.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userEmail = payload.user.email;
        state.token = payload.token;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
