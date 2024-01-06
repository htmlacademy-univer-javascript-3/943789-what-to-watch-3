import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeFavoriteStatus } from '../../../api/api-actions';
import { AuthStatus } from '../../../auth/auth-status';
import { FavoriteStatus } from '../../../data/films/favorite-status-info';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectAuthorizationStatus } from '../../../stores/auth/auth-selectors';
import { selectFavorites } from '../../../stores/favorites/favorites-selectors';

type FilmInfo = {
  id: string;
  isFavorite: boolean;
}

type Props = {
  afterMyListCallback?: () => void;
}

export function MyListButton(props: FilmInfo & Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const favorites = useAppSelector(selectFavorites);

  const handleMyListClick = useCallback(() => {
    if (authStatus === AuthStatus.AuthRequired) {
      navigate('/login');
    }

    const statusToSet = props.isFavorite ? FavoriteStatus.DoNothing : FavoriteStatus.ToWatch;
    dispatch(changeFavoriteStatus({filmId: props.id, status: statusToSet}));

    if (props.afterMyListCallback !== undefined) {
      props.afterMyListCallback();
    }
  }, [authStatus, dispatch, navigate, props]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleMyListClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={props.isFavorite ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      {
        authStatus === AuthStatus.Authorithed
          ? <span className="film-card__count">{favorites.length}</span>
          : null
      }
    </button>
  );
}
