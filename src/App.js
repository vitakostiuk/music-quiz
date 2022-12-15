import { Route, Routes } from 'react-router-dom';
import Container from './components/common/Container';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import GamePage from './components/pages/GamePage';

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
