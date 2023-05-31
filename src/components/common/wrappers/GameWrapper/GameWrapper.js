import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuizMode } from '../../../../redux/player/playerSelectors';
import s from './GameWrapper.module.css';

const GameWrapper = ({ children }) => {
  const isRoboQuizMode = useSelector(getQuizMode);

  return (
    <div
      className={
        isRoboQuizMode ? s.gamePageWrapperRobo : s.gamePageWrapperMusic
      }
    >
      {children}
    </div>
  );
};

GameWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameWrapper;
