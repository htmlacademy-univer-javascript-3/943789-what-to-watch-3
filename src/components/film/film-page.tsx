import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchCommentsByFilmId, fetchFilmById, fetchSimilarFilmById } from '../../api/api-actions';
import FilmCardsList from '../film-list/film-cards-list';
import FilmCardDesciption from './card-description/film-card-desciption';
import { AuthStatus } from '../../auth/auth-status';

const SIMILAR_FILMS_COUNT = 4;

export default function FilmPage() {
  const params = useParams();
  const dispatch = useAppDispatch();

  const id = params.id as string;

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchFilmById(id));
    dispatch(fetchCommentsByFilmId(id));
    dispatch(fetchSimilarFilmById(id));
  }, [dispatch, id]);

  const filmInfo = useAppSelector((store) => store.currentFilm);
  const similarFilms = useAppSelector((store) => store.similarFilms)?.slice(0, SIMILAR_FILMS_COUNT) || [];
  const authStatus = useAppSelector((store) => store.authorizationStatus);

  if (params.id === undefined || filmInfo === undefined) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmInfo.backgroundImage} alt={filmInfo.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmInfo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmInfo.genre}</span>
                <span className="film-card__year">{filmInfo.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                {
                  authStatus === AuthStatus.Authorithed
                    ? <Link to="review" className="btn film-card__button">Add review</Link>
                    : null
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmInfo.posterImage} alt={filmInfo.name} width="218" height="327" />
            </div>

            <FilmCardDesciption />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmCardsList films={similarFilms} />
        </section>

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
