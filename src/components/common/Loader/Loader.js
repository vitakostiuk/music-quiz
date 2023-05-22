import MoonLoader from 'react-spinners/MoonLoader';

const override = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // transition: 'translate(-50%, -50%)',
};

const Loader = () => {
  return (
    <div>
      <MoonLoader cssOverride={override} size={100} color={'#4f65f1'} />
    </div>
  );
};

export default Loader;
