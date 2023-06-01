import SignIn from '../Auth/SignIn';
import GameWrapper from '../common/wrappers/GameWrapper';
import Container from '../common/Container';

const SignInPage = () => (
  <GameWrapper>
    <Container>
      <SignIn />
    </Container>
  </GameWrapper>
);

export default SignInPage;
