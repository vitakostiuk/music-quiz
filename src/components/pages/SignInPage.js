import SignIn from '../Auth/SignIn';
import AuthWrapper from '../common/wrappers/AuthWrapper/AuthWrapper';

const SignInPage = () => (
  <AuthWrapper>
    <SignIn />
  </AuthWrapper>
);

export default SignInPage;
