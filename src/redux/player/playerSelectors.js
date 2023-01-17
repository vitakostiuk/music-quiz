const getQuizMode = state => state.player.isRoboQuizMode;
const getLevel = state => state.player.level;
const getSongsList = state => state.player.songslist;
const getCurrent = state => state.player.currentSong;
const isPlaying = state => state.player.playing;
const clickAnswer = state => state.player.clickAnswer;
const answerState = state => state.player.answerState;
const getStartPlayingTime = state => state.player.startPlayingTime;
const getLevelCompleteInfo = state => state.player.levelCompleteInfo;

export {
  getQuizMode,
  getLevel,
  getSongsList,
  getCurrent,
  isPlaying,
  clickAnswer,
  answerState,
  getStartPlayingTime,
  getLevelCompleteInfo,
};
