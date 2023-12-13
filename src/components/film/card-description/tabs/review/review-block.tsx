import { CommentInfo } from '../../../../../data/comments/comment-info';

export function ReviewBlock(props: CommentInfo) {
  const date = new Date(Date.parse(props.date));
  const readableDate = date.toLocaleDateString('en-US', {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{props.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{props.user}</cite>
          <time className="review__date" dateTime={date.toDateString()}>{readableDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{props.rating}</div>
    </div>
  );
}