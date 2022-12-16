import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/users/signup`, credentials);

      return data;
    } catch (error) {
      // console.log(error.response.data.message);
      alert(error.response.data.message);
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
      alert(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export { signup, signin };
