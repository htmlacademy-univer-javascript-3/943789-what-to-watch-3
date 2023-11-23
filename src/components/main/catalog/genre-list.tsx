import classNames from 'classnames';
import { changeFilterGenreAction } from '../../../actions/action';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type Props = {
  genres: Set<string>;
}

export function GenreList({ genres }: Props) {
  const dispatch = useAppDispatch();

  const selectedGenre = useAppSelector((store) => store.genre);

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
              dispatch(changeFilterGenreAction(genre));
            }}
            >{genre}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
