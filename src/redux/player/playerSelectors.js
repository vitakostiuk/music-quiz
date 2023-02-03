const getQuizMode = state => state.player.isRoboQuizMode;
const getLanguage = state => state.player.isEngLang;
const getLevel = state => state.player.level;
const getSongsListEN = state => state.player.songslistEN;
const getSongsListUKR = state => state.player.songslistUKR;
const getCurrent = state => state.player.currentSong;
const isPlaying = state => state.player.playing;
const clickAnswer = state => state.player.clickAnswer;
const answerState = state => state.player.answerState;
const getStartPlayingTime = state => state.player.startPlayingTime;
const getLevelCompleteInfo = state => state.player.levelCompleteInfo;
const getLeaderboardInfoEN = state => state.player.leaderboardInfoEN;
const getLeaderboardInfoUKR = state => state.player.leaderboardInfoUKR;
const getUserScoreEN = state => state.player.userScoreEN;
const getUserScoreUKR = state => state.player.userScoreUKR;

export {
  getQuizMode,
  getLanguage,
  getLevel,
  getSongsListEN,
  getSongsListUKR,
  getCurrent,
  isPlaying,
  clickAnswer,
  answerState,
  getStartPlayingTime,
  getLevelCompleteInfo,
  getLeaderboardInfoEN,
  getLeaderboardInfoUKR,
  getUserScoreEN,
  getUserScoreUKR,
};
