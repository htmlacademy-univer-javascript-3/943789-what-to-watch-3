import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useCallback, useEffect } from 'react';
import { fetchCommentsByFilmId, fetchFilmById, fetchSimilarFilmById } from '../../api/api-actions';
import FilmCardsList from '../common-film-components/film-cards-list';
import FilmCardDesciption from './card-description/film-card-desciption';
import { AuthStatus } from '../../auth/auth-status';
import { selectCurrentFilm, selectSimilarFilms } from '../../stores/current-film/current-film-selectors';
import { selectAuthorizationStatus } from '../../stores/auth/auth-selectors';
import { Header } from '../layout/header';
import { PlayButton } from '../common-film-components/film-card-buttons/play-button';
import { MyListButton } from '../common-film-components/film-card-buttons/my-list-button';
import { setPromoFilm } from '../../stores/films/films-actions';
import { setCurrentFilm } from '../../stores/current-film/current-film-actions';

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

  const filmInfo = useAppSelector(selectCurrentFilm);
  const similarFilms = useAppSelector(selectSimilarFilms) || [];
  const authStatus = useAppSelector(selectAuthorizationStatus);

  const afterMyListCallback = useCallback(() => {
    if (filmInfo === undefined) {
      return;
    }

    dispatch(setCurrentFilm({ ...filmInfo, isFavorite: !filmInfo.isFavorite }));
  }, [dispatch, filmInfo]);

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

          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmInfo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmInfo.genre}</span>
                <span className="film-card__year">{filmInfo.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={filmInfo.id}/>
                <MyListButton id={filmInfo.id} isFavorite={filmInfo.isFavorite} afterMyListCallback={afterMyListCallback}/>
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
