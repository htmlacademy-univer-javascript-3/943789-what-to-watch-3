import { AuthStatus } from '../../auth/auth-status';
import { useAppSelector } from '../../hooks';
import SignInPage from '../sign-in/sign-in-page';

type Props = {
  children: JSX.Element;
}

export default function AuthRequired(props : Props) {
  const authorizationStatus = useAppSelector((store) => store.authorizationStatus);

  return authorizationStatus === AuthStatus.Authorithed ? props.children : <SignInPage />;
}
