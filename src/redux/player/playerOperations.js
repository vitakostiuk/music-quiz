import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/api';
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

export { getAllEng, getAllUkr };
