import { createSlice } from '@reduxjs/toolkit';
import { songs } from '../../components/Game/songs';

const initialState = {
  songslist: songs.find(({ stage }) => stage === 1).quizInfo,
  // songslist: [],
  currentSong: 0,
  playing: false,
  clickAnswer: false,
  answerState: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSongsArr: (state, { payload }) => {
      state.songslist = payload;
      // state.songslist = songs.find(({ stage }) => stage === payload).quizInfo;
    },
    togglePlaying: (state, { payload }) => {
      state.playing = state.playing ? false : true;
    },
    setCurrent: (state, { payload }) => {
      state.currentSong = payload;
    },
    setClickAnswer: (state, { payload }) => {
      state.clickAnswer = payload;
    },
    setAnswerState: (state, { payload }) => {
      state.answerState = [...state.answerState, payload];
    },
    resetAnswerStateArray: (state, { payload }) => {
      state.answerState = payload;
    },
  },
});

export const {
  setSongsArr,
  togglePlaying,
  setCurrent,
  setClickAnswer,
  setAnswerState,
  resetAnswerStateArray,
} = playerSlice.actions;

export default playerSlice.reducer;