type Props = {
  handleClick: React.MouseEventHandler;
}

export function ShowMoreButton({handleClick} : Props) {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={handleClick}>Show more</button>
    </div>
  );
}
