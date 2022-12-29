import { createSlice } from '@reduxjs/toolkit';
import { songs } from '../../components/Game/songs';

const initialState = {
  songslist: songs.find(({ stage }) => stage === 1).quizInfo,
  currentSong: 0,
  playing: false,
  clickAnswer: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSongsArr: (state, { payload }) => {
      state.songslist = payload;
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
  },
});

export const { setSongsArr, togglePlaying, setCurrent, setClickAnswer } =
  playerSlice.actions;

export default playerSlice.reducer;
