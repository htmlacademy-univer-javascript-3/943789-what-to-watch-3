import { useRef, FormEvent, useCallback, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatus } from '../../data/auth/auth-status';
import { getAuthData } from '../../api/api-actions';
import { selectAuthError, selectAuthorizationStatus } from '../../stores/auth/auth-selectors';
import { Header } from '../layout/header';
import classNames from 'classnames';

type ErrorVisibility = {
  password: boolean;
  email: boolean;
  message: boolean;
}

export default function SignInPage() {
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const authError = useAppSelector(selectAuthError);
  const [errorVisibility, setErrorVisibillity] = useState<ErrorVisibility>({ password: false, email: false, message: false });

  useEffect(() => {
    setErrorVisibillity({
      password: authError?.details.some((detail) => detail.property === 'password') || false,
      email: authError?.details.some((detail) => detail.property === 'email') || false,
      message: (authError?.details.length ?? 0) > 0
    });
  }, [authError]);

  const handleSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      dispatch(
        getAuthData({ email: emailRef.current.value, password: passwordRef.current.value })
      );
    }
  }, [dispatch]);

  const handleChange = useCallback(() => {
    setErrorVisibillity({
      password: false,
      email: false,
      message: false
    });
  }, [setErrorVisibillity]);

  if (authStatus === AuthStatus.Authorithed) {
    return <Navigate to='/' />;
  }

  const messages = authError?.details.map((detail) => detail.messages.join('\n')).flat();

  return (
    <div>
      <div className="user-page">
        <Header />

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="sign-in__fields">

              {messages === undefined || !errorVisibility.message ? null :
                <div className="sign-in__message">
                  {messages.map((message) => <p key={message}>{message}</p>)}
                </div>}

              <div className={classNames({ 'sign-in__field': true, 'sign-in__field--error': errorVisibility.email })}>
                <input ref={emailRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className={classNames({ 'sign-in__field': true, 'sign-in__field--error': errorVisibility.password })}>
                <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
