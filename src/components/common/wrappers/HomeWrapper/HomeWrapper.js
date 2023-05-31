import PropTypes from 'prop-types';
import s from './HomeWrapper.module.css';

const HomeWrapper = ({ children }) => (
  <div className={s.homePageWrapper}>{children}</div>
);

HomeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeWrapper;
