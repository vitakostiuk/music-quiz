import { createSlice } from '@reduxjs/toolkit';
import {
  signup,
  signin,
  forgotPassword,
  google,
  logout,
  getUser,
} from './authOperations';

const initialState = {
  userID: null,
  userEmail: null,
  userAvatar: null,
  token: null,
  googleToken: null,
  loading: false,
  error: null,
  sentEmail: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // REDUCER FOR GOOGLE AUTH
      .addCase(google.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(google.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userID = payload.user.id;
        state.userEmail = payload.user.email;
        state.token = payload.token;
        state.userAvatar = payload.user.avatarURL;
      })
      .addCase(google.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR SIGN_UP
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.userID = payload.user.id;
        state.userEmail = payload.user.email;
        state.token = payload.token;
        state.userAvatar = payload.user.avatarURL;
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
        console.log(payload);
        state.loading = false;
        state.userID = payload.user.id;
        state.userEmail = payload.user.email;
        state.token = payload.token;
        state.userAvatar = payload.user.avatarURL;
      })
      .addCase(signin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR GET_USER
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.userEmail = payload.email;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.token = null;
        state.userID = null;
        state.userEmail = null;
        state.userAvatar = null;
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.sentEmail = payload;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR LOGOUT
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userID = null;
        state.userEmail = null;
        state.token = null;
        state.userAvatar = null;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
