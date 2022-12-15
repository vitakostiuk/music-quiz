import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../redux/auth/authSelectors';
import Container from './common/Container';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import GamePage from './pages/GamePage';

function App() {
  const token = useSelector(getToken);
  console.log('token', token);
  return (
    <>
      <Container>
        <Routes>
          {/* NOT AUTH */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <SignInPage />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" replace /> : <SignUpPage />}
          />
          {/* AUTH */}
          <Route
            path="/"
            element={!token ? <Navigate to="/login" replace /> : <GamePage />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
