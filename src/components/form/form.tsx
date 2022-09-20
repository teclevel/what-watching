import { FormEvent, Fragment, useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APIRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentSendAction } from '../../store/api-actions';
import { getDisabledFormStatus } from '../../store/form-state/selector';

const stars = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isFormDisabled = useAppSelector(getDisabledFormStatus);

  const initialState = {
    id: id,
    comment: '',
    rating: 0
  };

  const [formData, setFormData] = useState(initialState);
  const [isButtonSubmitDisabled, setIsButtonSubmitDisabled] = useState(true);
  const [lengthComment, setLengthComment] = useState(0);

  useEffect(() => {
    if (lengthComment >= MIN_COMMENT_LENGTH
      && lengthComment <= MAX_COMMENT_LENGTH
      && formData.rating > 0) {
      setIsButtonSubmitDisabled(false);
    } else {
      setIsButtonSubmitDisabled(true);
    }
  }, [formData.rating, lengthComment]);

  const submitFormHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(fetchCommentSendAction(formData));
    navigate(`${APIRoute.Films}/${id}`);
    setFormData(initialState);
  };

  const changeRatingHandle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const changeReviewHandle = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
    setLengthComment(value.length);
  };

  return (
    <form action="#" className="add-review__form" onSubmit={submitFormHandle}>
      <div className="rating">
        <div className="rating__stars">
          {
            stars.map((star) => (
              <Fragment key={star}>
                <input className="rating__input" type="radio" name="rating"
                  id={`star-${star}`}
                  value={star}
                  onChange={changeRatingHandle}
                  disabled={isFormDisabled}
                />
                <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
              </Fragment>
            ))
          }
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="comment" id="review-text" placeholder="Review text"
          value={formData.comment}
          onChange={changeReviewHandle}
          disabled={isFormDisabled}
        >
        </textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={isButtonSubmitDisabled}>Post</button>
        </div>
      </div>

    </form>
  );
}

export default Form;
