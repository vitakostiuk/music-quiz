import { Route, Routes } from 'react-router-dom';
import Container from './common/Container';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import GamePage from './pages/GamePage';

function App() {
  return (
    <>
      <Container>
        <Routes>
          {' '}
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/" element={<GamePage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
