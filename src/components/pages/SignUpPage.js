import SignUp from '../Auth/SignUp/SignUp';
import GameWrapper from '../common/wrappers/GameWrapper';
import Container from '../common/Container';

const SignUpPage = () => (
  <GameWrapper>
    <Container>
      <SignUp />
    </Container>
  </GameWrapper>
);

export default SignUpPage;
