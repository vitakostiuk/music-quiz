import { createSlice } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import { songs } from '../../components/Game/songs';
import { getAll } from './playerOperations';

const initialState = {
  isRoboQuizMode: false,
  level: 1,
  songslist: songs.find(({ stage }) => stage === 1).quizInfo,
  // currentSong = 0, бо прив'язано до індекса пісні
  currentSong: 0,
  playing: false,
  clickAnswer: false,
  answerState: [],
  startPlayingTime: '',
  levelCompleteInfo: [],
  leaderboardInfo: [],
  loading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setQuizMode: (state, { payload }) => {
      state.isRoboQuizMode = payload;
    },
    setLevel: (state, { payload }) => {
      state.level = state.level + 1;
    },
    restartLevel: (state, { payload }) => {
      state.level = payload;
    },
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
    setStartPlayingTime: (state, { payload }) => {
      state.startPlayingTime = payload;
    },
    setLevelCompleteInfo: (state, { payload }) => {
      state.levelCompleteInfo = [...state.levelCompleteInfo, payload];
    },
    resetLevelCompleteInfo: (state, { payload }) => {
      state.levelCompleteInfo = payload;
    },
  },
  extraReducers: builder => {
    builder
      // REDUCER FOR ALL INFO FOR LEADERBOARD
      .addCase(getAll.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAll.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.leaderboardInfo = payload;
      })
      .addCase(getAll.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setQuizMode,
  setLevel,
  restartLevel,
  setSongsArr,
  togglePlaying,
  setCurrent,
  setClickAnswer,
  setAnswerState,
  resetAnswerStateArray,
  setStartPlayingTime,
  setLevelCompleteInfo,
  resetLevelCompleteInfo,
} = playerSlice.actions;

export default playerSlice.reducer;
