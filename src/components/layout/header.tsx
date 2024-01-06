import React, { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../auth/auth-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserInfo } from '../../stores/auth/auth-selectors';
import { logout } from '../../api/api-actions';

export function Header({ children }: { children?: ReactNode }) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userInfo = useAppSelector(selectUserInfo);

  const handleLogoutClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {children}

      <ul className="user-block">
        {
          authorizationStatus === AuthStatus.Authorithed
            ?
            <React.Fragment>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src={userInfo?.avatarUrl} alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <button className="user-block__link" onClick={handleLogoutClick}>Sign out</button>
              </li>
            </React.Fragment>
            :
            <li className="user-block_item">
              <Link to={'/login'} className='user-block__link'>Sign in</Link>
            </li>
        }
      </ul>
    </header>
  );
}
