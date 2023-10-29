import { Link, useParams } from 'react-router-dom';
import NotFoundPage from '../system/not-found-page';
import { IFilmManager } from '../../interfaces/film-manager';
import FilmCardsList from '../film-list/film-cards-list';

function GetRatingLevelByScore(score: number) {
  return score > 5 ? 'Very Good' : 'BAAAAAAD';
}

export default function FilmPage({filmManager} : {filmManager: IFilmManager}) {
  const params = useParams();

  if (params.id === undefined) {
    return <NotFoundPage />;
  }

  const filmInfo = filmManager.getFilmOrNull(params.id);
  const filmRating = filmManager.getFilmRatingOrNull(params.id);

  if (filmInfo === null || filmRating === null) {
    return <NotFoundPage/>;
  }

  // take only first 4 movies
  const films = filmManager.getFilms().slice(0, 4);

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={filmInfo.coverUrl} alt={filmInfo.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmInfo.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmInfo.genre}</span>
                <span className="film-card__year">{filmInfo.releaseDate.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to="review" className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={filmInfo.coverUrl} alt={filmInfo.title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className="film-nav__item film-nav__item--active">
                    <a to="#" className="film-nav__link">Overview</a>
                  </li>
                  <li className="film-nav__item">
                    <a to="#" className="film-nav__link">Details</a>
                  </li>
                  <li className="film-nav__item">
                    <a to="#" className="film-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="film-rating">
                <div className="film-rating__score">{filmRating.score}</div>
                <p className="film-rating__meta">
                  <span className="film-rating__level">{GetRatingLevelByScore(filmRating.score)}</span>
                  <span className="film-rating__count">{filmRating.count} ratings</span>
                </p>
              </div>

              {/*TODO: added film description*/}
              <div className="film-card__text">
                <p>In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave&apos;s friend and protege.</p>

                <p>Gustave prides himself on providing first-class service to the hotel&apos;s guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave&apos;s lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.</p>

                <p className="film-card__director"><strong>Director: Wes Anderson</strong></p>

                <p className="film-card__starring"><strong>Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmCardsList films={films} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
