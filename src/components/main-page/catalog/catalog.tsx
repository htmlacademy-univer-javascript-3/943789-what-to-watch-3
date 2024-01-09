import FilmCardsList from '../../common-film-components/film-cards-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { GenreList } from './genre-list';
import { useEffect, useState } from 'react';
import { ShowMoreButton } from './show-more-button';
import { selectCurrentGenre, selectFilteredFilms } from '../../../stores/films/films-selectors';
import { filterFilms } from '../../../stores/films/films-actions';

const MOVIE_TO_SHOW_STEP = 8;

export function Catalog() {
  const [filmsToShow, setFilmsToShow] = useState<number>(MOVIE_TO_SHOW_STEP);

  const dispatch = useAppDispatch();

  const films = useAppSelector(selectFilteredFilms);
  const selectedGenre = useAppSelector(selectCurrentGenre);

  useEffect(() => {
    dispatch(filterFilms());
    setFilmsToShow(MOVIE_TO_SHOW_STEP);
  }, [dispatch, selectedGenre]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList />

      <FilmCardsList films={films.slice(0, filmsToShow)} />

      {
        filmsToShow < films.length
          ? <ShowMoreButton handleClick={() => setFilmsToShow((s) => s + MOVIE_TO_SHOW_STEP)} />
          : null
      }
    </section>
  );
}
