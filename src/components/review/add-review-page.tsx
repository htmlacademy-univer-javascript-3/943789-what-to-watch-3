import { Link, useParams } from 'react-router-dom';
import { IFilmManager } from '../../interfaces/film-manager';
import NotFoundPage from '../system/not-found-page';
import AddReviewForm from './forns/add-review-form';

export default function AddReviewPage({filmManager} : {filmManager: IFilmManager}) {
  const params = useParams();

  if (params.id === undefined) {
    return <NotFoundPage />;
  }

  const filmInfo = filmManager.getFilmOrNull(params.id);

  if (filmInfo === null) {
    return <NotFoundPage/>;
  }


  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={filmInfo.coverUrl} alt={filmInfo.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={'..'} className="breadcrumbs__link">{filmInfo.title}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

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

          <div className="film-card__poster film-card__poster--small">
            <img src={filmInfo.coverUrl} alt={filmInfo.title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <AddReviewForm />
        </div>

      </section>
    </div>
  );
}
