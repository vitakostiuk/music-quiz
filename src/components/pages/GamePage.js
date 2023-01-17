import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header';
import Game from '../Game';
import Container from '../common/Container';
import Robot from '../common/Robot';
import { getQuizMode } from '../../redux/player/playerSelectors';
import s from './Pages.module.css';

const GamePage = () => {
  const isRoboQuizMode = useSelector(getQuizMode);
  return (
    <div
      className={
        isRoboQuizMode ? s.gamePageWrapperRobo : s.gamePageWrapperMusic
      }
    >
      <Container>
        <Header />
        <Robot />
        <Game />
      </Container>
    </div>
  );
};

export default GamePage;
