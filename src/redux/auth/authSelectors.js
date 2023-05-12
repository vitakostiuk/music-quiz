const getToken = state => state.auth.token;
const getUserEmail = state => state.auth.userEmail;
const getUserID = state => state.auth.userID;
const getGoogleToken = state => state.auth.googleToken;
const isSentEmail = state => state.auth.sentEmail;
const getAvatarURL = state => state.auth.userAvatar;

export {
  getToken,
  getUserEmail,
  getGoogleToken,
  isSentEmail,
  getUserID,
  getAvatarURL,
};
