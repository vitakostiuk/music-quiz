import { createSlice } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import { songs } from '../../components/Game/songs';
import { songsEn } from '../../components/Game/songsEN';
import { getAllEng, getAllUkr } from './playerOperations';

const initialState = {
  isRoboQuizMode: false,
  isEngLang: true,
  level: 1,
  songslistUKR: songs.find(({ stage }) => stage === 1).quizInfo,
  songslistEN: songsEn.find(({ stage }) => stage === 1).quizInfo,
  // currentSong = 0, бо прив'язано до індекса пісні
  currentSong: 0,
  playing: false,
  clickAnswer: false,
  answerState: [],
  startPlayingTime: '',
  levelCompleteInfo: [],
  leaderboardInfoEN: [],
  leaderboardInfoUKR: [],
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
    toggleLanguage: (state, { payload }) => {
      state.isEngLang = !state.isEngLang;
    },
    setLevel: (state, { payload }) => {
      state.level = state.level + 1;
    },
    restartLevel: (state, { payload }) => {
      state.level = payload;
    },
    setSongsArrEN: (state, { payload }) => {
      state.songslistENG = payload;
    },
    setSongsArrUKR: (state, { payload }) => {
      state.songslistUKR = payload;
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
      // REDUCER FOR ALL INFO FOR LEADERBOARD (ENG version)
      .addCase(getAllEng.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEng.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.leaderboardInfoEN = payload;
      })
      .addCase(getAllEng.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR ALL INFO FOR LEADERBOARD (UKR version)
      .addCase(getAllUkr.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUkr.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.leaderboardInfoUKR = payload;
      })
      .addCase(getAllUkr.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setQuizMode,
  toggleLanguage,
  setLevel,
  restartLevel,
  setSongsArrEN,
  setSongsArrUKR,
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
