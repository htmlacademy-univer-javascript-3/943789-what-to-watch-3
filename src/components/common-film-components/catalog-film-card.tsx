import { Link } from 'react-router-dom';
import { FilmInfo } from '../../data/films/film-info';
import { useState } from 'react';
import VideoPlayer, { VideoState } from '../video-player/video-player';

type Events = {
  handleMouseEnter?: React.MouseEventHandler;
  handleMouseLeave?: React.MouseEventHandler;
}

type CardInfo = {
  filmInfo: FilmInfo;
}

export default function CatalogFilmCard(props: CardInfo & Events) {
  const filmInfo = props.filmInfo;

  const [videoState, setVideoState] = useState<VideoState>(VideoState.Load);
  const [playVideoTimer, setPlayVideoTimer] = useState<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = function (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const timeout = setTimeout(() => setVideoState(VideoState.Play), 2000);
    setPlayVideoTimer(timeout);

    props.handleMouseEnter?.(event);
  };

  const handleMouseOut = function (event: React.MouseEvent<HTMLElement, MouseEvent>) {
    clearTimeout(playVideoTimer);
    setVideoState(VideoState.Load);

    props.handleMouseLeave?.(event);
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}>
      <Link className="small-film-card__link" to={`/films/${filmInfo.id}`}>
        <VideoPlayer
          height={175}
          width={280}
          src={props.filmInfo.previewVideoLink}
          poster={props.filmInfo.previewImage}
          state={videoState}
          muted
        />
        <h3 className="small-film-card__title">
          {filmInfo.name}
        </h3>
      </Link>
    </article>
  );
}
