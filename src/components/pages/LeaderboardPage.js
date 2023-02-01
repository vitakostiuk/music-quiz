import React from 'react';
import { useSelector } from 'react-redux';
import { getQuizMode } from '../../redux/player/playerSelectors';
import Leaderboard from '../Leaderboard';
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
        <Leaderboard />
      </Container>
    </div>
  );
};

export default LeaderboardPage;
