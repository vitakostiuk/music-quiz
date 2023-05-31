import Home from '../Home';
import Container from '../common/Container';
import HomeWrapper from '../common/wrappers/HomeWrapper';

const HomePage = () => (
  <HomeWrapper>
    <Container>
      <Home />
    </Container>
  </HomeWrapper>
);

export default HomePage;
