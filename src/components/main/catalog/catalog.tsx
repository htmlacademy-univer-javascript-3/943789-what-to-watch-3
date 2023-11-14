import FilmCardsList from '../../film-list/film-cards-list';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { GenresFilter } from '../../../data/films/genres-filter';
import classNames from 'classnames';
import { changeFilterGenreAction } from '../../../actions/action';

const allFilters = Object.values(GenresFilter) as Array<GenresFilter>;

export function Catalog() {
  const dispatch = useAppDispatch();

  const filterStore = useAppSelector((st) => st);

  const films = useAppSelector((st) => st.films);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <ul className="catalog__genres-list">
        {allFilters.map((filter) => {
          const liClass = classNames({
            'catalog__genres-item': true,
            'catalog__genres-item--active': filterStore.genreFilter === filter
          });

          return (
            <li className={liClass} key={filter}>
              <a className='catalog__genres-link' onClick={() => dispatch(changeFilterGenreAction(filter))}>{filter}</a>
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
