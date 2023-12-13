import React from 'react';
import { useAppSelector } from '../../../../hooks';

function GetRatingLevelByScore(score: number) {
  switch (true) {
    case score < 3:
      return 'Bad';
    case score >= 3 && score < 5:
      return 'Normal';
    case score >= 5 && score < 8:
      return 'Good';
    case score >= 8 && score < 10:
      return 'Very Good';
    case score >= 10:
      return 'Awesome';
  }
}

export default function OverviewContent() {
  const filmInfo = useAppSelector((store) => store.currentFilm);

  if (filmInfo === undefined) {
    return (null);
  }

  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{filmInfo.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{GetRatingLevelByScore(filmInfo.rating)}</span>
          <span className="film-rating__count">{filmInfo.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{filmInfo.description}</p>
        <p className="film-card__director"><strong>Director: {filmInfo.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {filmInfo.starring.join(', ')} and others</strong></p>
      </div>
    </React.Fragment>
  );
}
