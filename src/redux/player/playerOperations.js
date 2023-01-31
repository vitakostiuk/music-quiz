import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const getAll = createAsyncThunk(
  'player/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/game');

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export { getAll };
