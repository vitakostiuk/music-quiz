import React from 'react';
import { useSelector } from 'react-redux';
import { getQuizMode } from '../../redux/player/playerSelectors';
import Leaderboard from '../Leaderboard';
import Robot from '../common/Robot';
import Container from '../common/Container';
import s from './Pages.module.css';

const LeaderboardPage = () => {
  const isRoboQuizMode = useSelector(getQuizMode);
  return (
    <div
      className={
        isRoboQuizMode ? s.gamePageWrapperRobo : s.gamePageWrapperMusic
      }
    >
      <Container>
        <Robot />
        <Leaderboard />
      </Container>
    </div>
  );
};

export default LeaderboardPage;
