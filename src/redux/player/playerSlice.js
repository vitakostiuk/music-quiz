import { createSlice } from '@reduxjs/toolkit';
import { songs } from '../../components/Game/songs';
import { songsEn } from '../../components/Game/songsEN';
import {
  getAllEng,
  getAllUkr,
  getAllEngByUser,
  getAllUkrByUser,
} from './playerOperations';

const initialState = {
  isRoboQuizMode: false,
  isEngLang: true,

  levelRoboEN: 1,
  levelMusicEN: 1,

  levelRoboUKR: 1,
  levelMusicUKR: 1,

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

  newUserGameInfoEN: [],
  newUserGameInfoUKR: [],

  userScoreUKR: [],
  userScoreEN: [],

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

    // EN
    setLevelRoboEN: (state, { payload }) => {
      state.levelRoboEN = payload.length + 1;
    },
    setLevelMusicEN: (state, { payload }) => {
      state.levelMusicEN = payload.length + 1;
    },
    setNextLevelRoboEN: (state, { payload }) => {
      state.levelRoboEN = state.levelRoboEN + 1;
    },
    setNextLevelMusicEN: (state, { payload }) => {
      state.levelMusicEN = state.levelMusicEN + 1;
    },
    restartLevelRoboEN: (state, { payload }) => {
      state.levelRoboEN = payload;
    },
    restartLevelMusicEN: (state, { payload }) => {
      state.levelMusicEN = payload;
    },

    // UKR
    setLevelRoboUKR: (state, { payload }) => {
      state.levelRoboUKR = payload.length + 1;
    },
    setLevelMusicUKR: (state, { payload }) => {
      state.levelMusicUKR = payload.length + 1;
    },
    setNextLevelRoboUKR: (state, { payload }) => {
      state.levelRoboUKR = state.levelRoboUKR + 1;
    },
    setNextLevelMusicUKR: (state, { payload }) => {
      state.levelMusicUKR = state.levelMusicUKR + 1;
    },
    restartLevelRoboUKR: (state, { payload }) => {
      state.levelRoboUKR = payload;
    },
    restartLevelMusicUKR: (state, { payload }) => {
      state.levelMusicUKR = payload;
    },

    // Збереження скору нового юзера
    setNewUserGameInfoEN: (state, { payload }) => {
      state.newUserGameInfoEN = [...state.newUserGameInfoEN, payload];
    },
    setNewUserGameInfoUKR: (state, { payload }) => {
      state.newUserGameInfoUKR = [...state.newUserGameInfoUKR, payload];
    },

    setSongsArrEN: (state, { payload }) => {
      state.songslistEN = payload;
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
      })

      // REDUCER FOR GET SCORE BY USER (ENG version)
      .addCase(getAllEngByUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEngByUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.userScoreEN = payload;
      })
      .addCase(getAllEngByUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // REDUCER FOR GET SCORE BY USER (UKR version)
      .addCase(getAllUkrByUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUkrByUser.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.userScoreUKR = payload;
      })
      .addCase(getAllUkrByUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const {
  setQuizMode,
  toggleLanguage,

  setLevelRoboEN,
  setLevelMusicEN,
  setNextLevelRoboEN,
  setNextLevelMusicEN,
  restartLevelRoboEN,
  restartLevelMusicEN,

  setLevelRoboUKR,
  setLevelMusicUKR,
  setNextLevelRoboUKR,
  setNextLevelMusicUKR,
  restartLevelRoboUKR,
  restartLevelMusicUKR,

  setNewUserGameInfoEN,
  setNewUserGameInfoUKR,

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
