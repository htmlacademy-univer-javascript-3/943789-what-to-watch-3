import { AuthStatus } from '../../auth/auth-status';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../stores/auth/auth-selectors';
import SignInPage from '../sign-in/sign-in-page';

type Props = {
  children: JSX.Element;
}

export default function AuthRequired(props : Props) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  return authorizationStatus === AuthStatus.Authorithed ? props.children : <SignInPage />;
}
