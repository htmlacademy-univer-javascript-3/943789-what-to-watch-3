import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../auth/auth-status';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserInfo } from '../../stores/auth/auth-selectors';

export function Header({ children }: { children?: ReactNode }) {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <header className="page-header film-card__head">
      <div className="logo">
        <Link to='/' className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      <ul className="user-block">
        {
          authorizationStatus === AuthStatus.Authorithed
            ?
            <React.Fragment>
              <li className="user-block__item">
                <Link to="/mylist">
                  <div className="user-block__avatar">
                    <img src={userInfo?.avatarUrl} alt="User avatar" width="63" height="63" />
                  </div>
                </Link>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
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
