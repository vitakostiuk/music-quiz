import { createSlice } from '@reduxjs/toolkit';
import { signup, signin, forgotPassword } from './authOperations';

const initialState = {
  userEmail: null,
  token: null,
  googleToken: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    googleAuth: (state, { payload }) => {
      state.googleToken = payload.access_token;
    },
  },
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
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { googleAuth } = authSlice.actions;

export default authSlice.reducer;
