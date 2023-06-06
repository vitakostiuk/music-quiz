import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { sendToken } from '../player/playerOperations';

axios.defaults.baseURL = 'http://localhost:3000/api';
// axios.defaults.baseURL = 'https://musicquiz-backend.onrender.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/signup`, credentials);

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/signin`, credentials);

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/users/forgot-password`, email);

      toast.success(data.message);

      return data.message;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const google = createAsyncThunk(
  'auth/google',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/google`, credentials);

      return data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

const logout = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      await axios.post('/users/logout');
      sendToken.unset();
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      const { data } = await axios.get(`/users/current`);
      console.log('auth/getUser', data);
      return data;
    } catch (error) {
      sendToken.unset();
      return rejectWithValue(error.message);
    }
  }
);

export { signup, signin, forgotPassword, google, logout, getUser };
