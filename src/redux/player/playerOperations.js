import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.baseURL = 'https://musicquiz-backend.onrender.com/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const getAllEng = createAsyncThunk(
  'player/getAllEng',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/game/en');

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const getAllUkr = createAsyncThunk(
  'player/getAllUkr',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/game/ukr');

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const getAllEngByUser = createAsyncThunk(
  'player/getAllEngByUser',
  async (userID, { rejectWithValue, getState }) => {
    try {
      const { token, googleToken } = getState().auth;
      const accessToken = token ? token : googleToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const { data } = await axios.get(`/game/en/${userID}`);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const getAllUkrByUser = createAsyncThunk(
  'player/getAllUkrByUser',
  async (userID, { rejectWithValue, getState }) => {
    try {
      const { token, googleToken } = getState().auth;
      const accessToken = token ? token : googleToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const { data } = await axios.get(`/game/ukr/${userID}`);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const addLVLCompleteInfoEN = createAsyncThunk(
  'player/addLVLCompleteInfoEN',
  async (dataInfo, { rejectWithValue, getState }) => {
    try {
      const { token, googleToken } = getState().auth;
      const accessToken = token ? token : googleToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const { data } = await axios.post('/game/en', dataInfo);
      // console.log('data', data);

      return data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error(
          'You are not authorized. Log in or Sign up to save results'
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

const addLVLCompleteInfoUKR = createAsyncThunk(
  'player/addLVLCompleteInfoUKR',
  async (dataInfo, { rejectWithValue, getState }) => {
    try {
      const { token, googleToken } = getState().auth;
      const accessToken = token ? token : googleToken;
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const { data } = await axios.post('/game/ukr', dataInfo);
      // console.log('data', data);

      return data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error(
          'You are not authorized. Log in or Sign up to save results'
        );
      }
      return rejectWithValue(error.message);
    }
  }
);

export {
  getAllEng,
  getAllUkr,
  addLVLCompleteInfoEN,
  addLVLCompleteInfoUKR,
  getAllEngByUser,
  getAllUkrByUser,
};
