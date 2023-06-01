import MoonLoader from 'react-spinners/MoonLoader';
import s from './Loader.module.css';

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <MoonLoader size={100} color={'#4f65f1'} />
    </div>
  );
};

export default Loader;
