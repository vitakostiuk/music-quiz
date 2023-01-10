import React from 'react';
import Header from '../Header';
import Game from '../Game';
import Container from '../common/Container';
import Robot from '../common/Robot';
import s from './Pages.module.css';

const GamePage = () => {
  return (
    <div className={s.gamePageWrapper}>
      <Container>
        <Header />
        <Robot />
        <Game />
      </Container>
    </div>
  );
};

export default GamePage;
