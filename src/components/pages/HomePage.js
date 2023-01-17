import React from 'react';
import Home from '../Home';
import Container from '../common/Container';
import s from './Pages.module.css';

const HomePage = () => {
  return (
    <div className={s.homePageWrapper}>
      <Container>
        <Home />
      </Container>
    </div>
  );
};

export default HomePage;
