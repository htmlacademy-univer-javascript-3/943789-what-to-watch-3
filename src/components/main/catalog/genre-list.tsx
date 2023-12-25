import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setCurrentGenre } from '../../../stores/films/films-actions';
import { selectCurrentGenre, selectGenres } from '../../../stores/films/films-selectors';
import { AllGenresFilter } from '../../../data/consts/all-genres-filter';

function prepareGenreList(genres: string[]) {
  genres.sort();

  genres.unshift(AllGenresFilter);
}

export function GenreList() {
  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector(selectCurrentGenre);
  const genres = [... useAppSelector(selectGenres)];
  prepareGenreList(genres);

  return (
    <ul className="catalog__genres-list">
      {[...genres].map((genre) => {
        const liClass = classNames({
          'catalog__genres-item': true,
          'catalog__genres-item--active': selectedGenre === genre
        });

        return (
          <li className={liClass} key={genre}>
            <a className='catalog__genres-link' onClick={() => {
              dispatch(setCurrentGenre(genre));
            }}
            >{genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
