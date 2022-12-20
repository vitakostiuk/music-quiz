const getToken = state => state.auth.token;
const getGoogleToken = state => state.auth.googleToken;
const isSentEmail = state => state.auth.sentEmail;

export { getToken, getGoogleToken, isSentEmail };
