import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './auth/authSlice';
import playerSlice from './player/playerSlice';

const persistAuthConfig = {
  key: 'token',
  storage,
  whitelist: ['token', 'googleToken'],
};

const rootReducer = combineReducers({
  auth: persistReducer(persistAuthConfig, authSlice),
  player: playerSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(logger),
});

const persistor = persistStore(store);

export { store, persistor };
