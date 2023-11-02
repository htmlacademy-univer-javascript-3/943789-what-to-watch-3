import { Link } from 'react-router-dom';
import { FilmInfo } from '../../data/films/film-info';
import { useState } from 'react';
import VideoPreview from '../video/video-preview';

type Events = {
  handleMouseEnter?: React.MouseEventHandler;
  handleMouseLeave?: React.MouseEventHandler;
}

type CardInfo = {
  filmInfo: FilmInfo;
}

export default function CatalogFilmCard(props: CardInfo & Events) {
  const filmInfo = props.filmInfo;

  const [isPlaying, setIsPlaying] = useState(false);
  const [playVideoTimer, setPlayVideoTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = function (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const timeout = setTimeout(() => setIsPlaying(true), 2000);
    setPlayVideoTimer(timeout);

    props.handleMouseEnter?.(event);
  };

  const handleMouseOut = function(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    clearTimeout(playVideoTimer);
    setIsPlaying(false);

    props.handleMouseLeave?.(event);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
      <VideoPreview
        height={175}
        width={280}
        src={props.filmInfo.urlLink}
        poster={props.filmInfo.coverUrl}
        isPlaying={isPlaying}
        muted
      />
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmInfo.id}`}>{filmInfo.title}</Link>
      </h3>
    </article>
  );
}
