import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

//Відправка токена в заголовку Authorization
export const sendToken = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = '';
  },
};

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
      const { token } = getState().auth;
      sendToken.set(token);
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

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
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

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
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      const { data } = await axios.post('/game/en', dataInfo);
      console.log('addLVLCompleteInfoEN', data);

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
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      const { data } = await axios.post('/game/ukr', dataInfo);
      console.log('addLVLCompleteInfoUKR', data);

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

const editLevelByIdUKR = createAsyncThunk(
  'player/editLevelByIdUKR',
  async ({ id, userLevelCompleteInfo }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      const { data } = await axios.put(
        `/game/ukr/${id}`,
        userLevelCompleteInfo
      );
      console.log('editLevelByIdUKR', data);

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const editLevelByIdEN = createAsyncThunk(
  'player/editLevelByIdEN',
  async ({ id, userLevelCompleteInfo }, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().auth;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      sendToken.set(token);

      const { data } = await axios.put(`/game/en/${id}`, userLevelCompleteInfo);
      console.log('editLevelByIdEN', data);

      return data;
    } catch (error) {
      console.log(error);
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
  editLevelByIdEN,
  editLevelByIdUKR,
};
