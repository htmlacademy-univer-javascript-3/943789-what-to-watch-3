import { Catalog } from './catalog/catalog';
import { Header } from '../layout/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectPromoFilm } from '../../stores/films/films-selectors';
import { useCallback, useEffect } from 'react';
import { fetchPromoFilm } from '../../api/api-actions';
import { setPromoFilm } from '../../stores/films/films-actions';
import { PlayButton } from '../common-film-components/film-card-buttons/play-button';
import { MyListButton } from '../common-film-components/film-card-buttons/my-list-button';

export default function MainPage() {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(selectPromoFilm);

  useEffect(() => {
    dispatch(fetchPromoFilm());
  }, [dispatch]);

  const afterMyListCallback = useCallback(() => {
    if (promoFilm === undefined) {
      return;
    }

    dispatch(setPromoFilm({ ...promoFilm, isFavorite: !promoFilm.isFavorite }));
  }, [dispatch, promoFilm]);

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        {
          promoFilm === undefined ? null :
            <div className="film-card__wrap">
              <div className="film-card__info">
                <div className="film-card__poster">
                  <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327" />
                </div>

                <div className="film-card__desc">
                  <h2 className="film-card__title">{promoFilm?.name}</h2>
                  <p className="film-card__meta">
                    <span className="film-card__genre">{promoFilm?.genre}</span>
                    <span className="film-card__year">{promoFilm?.released}</span>
                  </p>

                  <div className="film-card__buttons">
                    <PlayButton id={promoFilm.id} />
                    <MyListButton id={promoFilm.id} isFavorite={promoFilm.isFavorite} afterMyListCallback={afterMyListCallback}/>
                  </div>
                </div>
              </div>
            </div>
        }
      </section>

      <div className="page-content">
        <Catalog />

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
