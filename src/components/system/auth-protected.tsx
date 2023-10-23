import SignInPage from '../sign-in/sign-in-page';

type Props = {
  children: JSX.Element;
}

function isAuthorized() {
  return true;
}

export default function AuthRequired(props : Props) {
  return isAuthorized() ? props.children : <SignInPage />;
}
