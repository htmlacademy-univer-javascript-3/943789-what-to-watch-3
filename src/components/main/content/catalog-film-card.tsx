type CardInfo = {
  filmName: string;
  coverUrl: string;
}

export default function CatalogFilmCard(cardInfo: CardInfo) {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={cardInfo.coverUrl} alt={cardInfo.filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{cardInfo.filmName}</a>
      </h3>
    </article>
  );
}
