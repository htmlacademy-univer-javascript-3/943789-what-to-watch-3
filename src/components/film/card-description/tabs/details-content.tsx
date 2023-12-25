import React from 'react';
import { useAppSelector } from '../../../../hooks';
import { selectCurrentFilm } from '../../../../stores/current-film/current-film-selectors';

const MINUTES_IN_HOUR = 60;

function GetHumanReadableRunTime(runTime: number) {
  const hours = Math.floor(runTime / MINUTES_IN_HOUR);
  const minutes = runTime % MINUTES_IN_HOUR;

  let readable = '';

  if (hours > 0) {
    readable += `${hours}h`;
  }

  if (minutes > 0) {
    if (readable.length > 0) {
      readable += ' ';
    }

    readable += `${minutes}m`;
  }

  if (readable.length === 0) {
    readable = '0m';
  }

  return readable;
}

export default function DetailsContent() {
  const filmInfo = useAppSelector(selectCurrentFilm);

  if (filmInfo === undefined) {
    return null;
  }

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{filmInfo.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {filmInfo.starring.map((actor) => (
              <React.Fragment key="actor">
                {actor} <br/>
              </React.Fragment>))}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{GetHumanReadableRunTime(filmInfo.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{filmInfo.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{filmInfo.released}</span>
        </p>
      </div>
    </div>
  );
}
