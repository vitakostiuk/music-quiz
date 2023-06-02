import Leaderboard from '../Leaderboard';
import Container from '../common/Container';
import GameWrapper from '../common/wrappers/GameWrapper';

const LeaderboardPage = () => (
  <GameWrapper>
    <Container>
      <Leaderboard />
    </Container>
  </GameWrapper>
);

export default LeaderboardPage;
