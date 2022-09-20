import { Reviews } from '../../../types/reviews';
import { formatDate } from '../../../utils';

type ReviewColProps = {
  comments: Reviews
}

function ReviewCol({ comments }: ReviewColProps): JSX.Element {
  return (
    <div className="film-card__reviews-col">
      {
        comments.map(({ id, comment, user, date, rating }) => (
          <div key={id} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{comment}</p>
              <footer className="review__details">
                <cite className="review__author">{user.name}</cite>
                <time className="review__date" dateTime={date}>{formatDate(date)}</time>
              </footer>
            </blockquote>
            <div className="review__rating">{rating}</div>
          </div>
        ))
      }
    </div>
  );
}

export default ReviewCol;
