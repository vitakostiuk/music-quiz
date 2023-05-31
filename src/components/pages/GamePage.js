import Game from '../Game';
import Container from '../common/Container';
import Robot from '../common/Robot';
import GameWrapper from '../common/wrappers/GameWrapper';

const GamePage = () => (
  <GameWrapper>
    <Container>
      <Robot />
      <Game />
    </Container>
  </GameWrapper>
);

export default GamePage;
