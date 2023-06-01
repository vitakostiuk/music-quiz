import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  isPlaying,
  getAnswerState,
  getCurrent,
} from '../../../redux/player/playerSelectors';
import { ReactComponent as RobotAnim1 } from '../../../images/WEB_anim1.svg';
import { ReactComponent as RobotAnim2 } from '../../../images/WEB_anim2.svg';
import { ReactComponent as RobotAnim3 } from '../../../images/WEB_anim3.svg';
import s from './Robot.module.css';

const Robot = props => {
  const playing = useSelector(isPlaying);
  const answersArray = useSelector(getAnswerState);
  const currentSong = useSelector(getCurrent);

  return (
    <div className={s.robotWrapper}>
      {playing && <RobotAnim2 className={s.robot} />}
      {!playing && !answersArray[currentSong] && (
        <RobotAnim1 className={s.robot} />
      )}
      {answersArray[currentSong] && <RobotAnim3 className={s.robot} />}
    </div>
  );
};

Robot.propTypes = {};

export default Robot;
