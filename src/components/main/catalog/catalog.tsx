import FilmCardsList from '../../film-list/film-cards-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { filterFilms } from '../../../actions/action';
import { GenreList } from './genre-list';
import { useEffect, useState } from 'react';
import { ShowMoreButton } from './show-more-button';

type Props = {
  genres: Set<string>;
}

const MOVIE_TO_SHOW_STEP = 8;

export function Catalog({ genres }: Props) {
  const [filmsToShow, setFilmsToShow] = useState<number>(MOVIE_TO_SHOW_STEP);

  const dispatch = useAppDispatch();

  const films = useAppSelector((store) => store.films);
  const selectedGenre = useAppSelector((store) => store.genre);

  useEffect(() => {
    dispatch(filterFilms());
    setFilmsToShow(MOVIE_TO_SHOW_STEP);
  }, [dispatch, selectedGenre]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList genres={genres} />

      <FilmCardsList films={films.slice(0, filmsToShow)} />

      {
        filmsToShow < films.length
          ? <ShowMoreButton handleClick={() => setFilmsToShow((s) => s + MOVIE_TO_SHOW_STEP)} />
          : null
      }
    </section>
  );
}
