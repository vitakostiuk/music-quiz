import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="960275281339-v6gnhefvhssroe44o12momhs38ae0of6.apps.googleusercontent.com">
            {' '}
            <App />
          </GoogleOAuthProvider>
        </Provider>
      </PersistGate>
    </BrowserRouter>
  </React.StrictMode>
);
