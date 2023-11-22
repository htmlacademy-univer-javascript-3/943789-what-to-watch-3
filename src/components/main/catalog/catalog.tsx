import FilmCardsList from '../../film-list/film-cards-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import classNames from 'classnames';
import { changeFilterGenreAction, filterFilms } from '../../../actions/action';

type Props = {
  genres: Set<string>;
}

export function Catalog({ genres }: Props) {
  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector((store) => store.genre);
  const films = useAppSelector((store) => store.films);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {[...genres].map((genre) => {
          const liClass = classNames({
            'catalog__genres-item': true,
            'catalog__genres-item--active': selectedGenre === genre
          });

          return (
            <li className={liClass} key={genre}>
              <a className='catalog__genres-link' onClick={() => {
                dispatch(changeFilterGenreAction(genre));
                dispatch(filterFilms());
              }}
              >{genre}
              </a>
            </li>
          );
        })}
      </ul>

      <FilmCardsList films={films} />

      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    </section>
  );
}
