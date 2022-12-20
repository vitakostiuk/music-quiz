import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:3000/api';
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

export { signup, signin, forgotPassword };
