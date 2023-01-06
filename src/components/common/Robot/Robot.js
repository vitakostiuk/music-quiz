import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as RobotAnim1 } from '../../../images/WEB_anim1.svg';
import s from './Robot.module.css';

const Robot = props => {
  return (
    <div className={s.robotWrapper}>
      <RobotAnim1 className={s.robot} />
    </div>
  );
};

Robot.propTypes = {};

export default Robot;
