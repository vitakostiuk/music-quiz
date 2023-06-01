import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';
import { getToken } from '../redux/auth/authSelectors';
import { getUser } from '../redux/auth/authOperations';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import Header from './Header';
import LeaderboardPage from './pages/LeaderboardPage';
import s from './App.module.css';

function App() {
  const dispatch = useDispatch();

  const token = useSelector(getToken);

  useEffect(() => {
    if (!token) return;

    dispatch(getUser());
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
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
