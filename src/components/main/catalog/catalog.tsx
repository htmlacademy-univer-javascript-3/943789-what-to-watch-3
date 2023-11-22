import FilmCardsList from '../../film-list/film-cards-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { filterFilms } from '../../../actions/action';
import { GenreList } from './genre-list';
import { useEffect } from 'react';

type Props = {
  genres: Set<string>;
}

export function Catalog({ genres }: Props) {
  const dispatch = useAppDispatch();

  const films = useAppSelector((store) => store.films);
  const selectedGenre = useAppSelector((store) => store.genre);

  useEffect(() => {
    dispatch(filterFilms());
  }, [dispatch, selectedGenre]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenreList genres={genres} />

      <FilmCardsList films={films} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
