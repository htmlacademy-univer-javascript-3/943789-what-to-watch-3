import { Link } from 'react-router-dom';
import { FilmInfo } from '../../data/films/film-info';

type Events = {
  handleMouseEnter?: React.MouseEventHandler;
  handleMouseLeave?: React.MouseEventHandler;
}

type CardInfo = {
  filmInfo: FilmInfo;
}

export default function CatalogFilmCard(props: CardInfo & Events) {
  const filmInfo = props.filmInfo;

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={props.handleMouseEnter} onMouseOver={props.handleMouseLeave}>
      <div className="small-film-card__image">
        <img src={filmInfo.coverUrl} alt={filmInfo.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmInfo.id}`}>{filmInfo.title}</Link>
      </h3>
    </article>
  );
}
