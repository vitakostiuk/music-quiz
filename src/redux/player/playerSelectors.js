const getSongsList = state => state.player.songslist;
const getCurrent = state => state.player.currentSong;
const isPlaying = state => state.player.playing;
const clickAnswer = state => state.player.clickAnswer;
const answerState = state => state.player.answerState;

export { getSongsList, getCurrent, isPlaying, clickAnswer, answerState };
