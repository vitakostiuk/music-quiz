import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
// import { getToken, getGoogleToken } from '../redux/auth/authSelectors';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';

function App() {
  // const token = useSelector(getToken);
  // const googleToken = useSelector(getGoogleToken);
  // console.log('token', token);
  // console.log('googleToken', googleToken);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} limit={1} />
      {/* <Routes>
          <Route
            path="/login"
            element={
              token || googleToken ? (
                <Navigate to="/" replace />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route
            path="/register"
            element={
              token || googleToken ? (
                <Navigate to="/" replace />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/"
            element={
              !token && !googleToken ? (
                <Navigate to="/login" replace />
              ) : (
                <GamePage />
              )
            }
          />
        </Routes> */}
    </>
  );
}

export default App;
