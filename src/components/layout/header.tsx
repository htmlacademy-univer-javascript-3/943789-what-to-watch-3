import React, { ReactNode, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../data/auth/auth-status';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectAuthorizationStatus, selectUserInfo } from '../../stores/auth/auth-selectors';
import { logout } from '../../api/api-actions';

type Props = {
  children?: ReactNode;
  type: HeaderType;
  hideUserBlock: boolean;
}

export enum HeaderType {
  FilmCard = 'film-card__head',
  UserPage = 'user-page__head'
}

export function Header({ children, type: headerType, hideUserBlock }: Props) {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const userInfo = useAppSelector(selectUserInfo);

  const handleLogoutClick = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <header className={`page-header ${headerType}`}>
      <div className="logo">
        <Link to='/' className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {children}

      {
        hideUserBlock ? null :
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
                    <a className="user-block__link" onClick={handleLogoutClick}>Sign out</a>
                  </li>
                </React.Fragment>
                :
                <li className="user-block_item">
                  <Link to={'/login'} className='user-block__link'>Sign in</Link>
                </li>
            }
          </ul>
      }
    </header>
  );
}
