import SignUp from '../Auth/SignUp/SignUp';
import AuthWrapper from '../common/wrappers/AuthWrapper/AuthWrapper';

const SignUpPage = () => (
  <AuthWrapper>
    <SignUp />
  </AuthWrapper>
);

export default SignUpPage;
