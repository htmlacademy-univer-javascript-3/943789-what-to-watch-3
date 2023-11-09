import React from 'react';
import { FilmInfo } from '../../../../data/films/film-info';
import { FilmRatingInfo } from '../../../../data/films/film-rating-info';

function GetRatingLevelByScore(score: number) {
  return score > 5 ? 'Very Good' : 'BAAAAAAD';
}

export default function OverviewContent(props: FilmInfo & FilmRatingInfo) {
  return (
    <React.Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{props.score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{GetRatingLevelByScore(props.score)}</span>
          <span className="film-rating__count">{props.count} ratings</span>
        </p>
      </div>

      {/*TODO: add film description*/}
      <div className="film-card__text">
        <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.</p>

        <p>Gustave prides himself on providing first-class service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>

        <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>

        <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
      </div>
    </React.Fragment>
  );
}
