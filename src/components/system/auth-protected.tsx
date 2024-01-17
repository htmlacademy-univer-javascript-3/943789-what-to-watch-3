import { useNavigate } from 'react-router-dom';
import { AuthStatus } from '../../data/auth/auth-status';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../stores/auth/auth-selectors';
import { useEffect } from 'react';

type Props = {
  children: JSX.Element;
}

export default function AuthRequired(props: Props) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (authorizationStatus === AuthStatus.AuthRequired) {
      navigate('/login');
    }
  }, [authorizationStatus, navigate]);

  return props.children;
}
