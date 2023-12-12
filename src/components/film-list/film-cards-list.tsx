import { useState } from 'react';
import { FilmInfo } from '../../data/films/film-info';
import CatalogFilmCard from './catalog-film-card';

type ListInfo = {
  films: FilmInfo[];
}

type ListState = {
  activeFilmId: string | null;
}

export default function FilmCardsList(info: ListInfo) {
  const [, setState] = useState<ListState>({ activeFilmId: null });

  return (
    <div className="catalog__films-list">
      {info.films.map((film) =>
        (
          <CatalogFilmCard
            key={film.id}
            filmInfo={film}
            handleMouseEnter={() => setState({ activeFilmId: film.id })}
            handleMouseLeave={() => setState({activeFilmId: null})}
          />
        ))}
    </div>
  );
}
