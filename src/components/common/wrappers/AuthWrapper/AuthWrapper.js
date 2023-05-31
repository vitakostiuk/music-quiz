import PropTypes from 'prop-types';
import GameWrapper from '../GameWrapper/GameWrapper';
import s from './AuthWrapper.module.css';

const AuthWrapper = ({ children }) => {
  return (
    <GameWrapper>
      <div className={s.container}>
        <div className={s.paper}>{children}</div>
      </div>
    </GameWrapper>
  );
};

AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthWrapper;
