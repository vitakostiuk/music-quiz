import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://http://localhost:3001/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
