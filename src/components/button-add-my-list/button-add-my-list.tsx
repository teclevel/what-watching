import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchChangeViewStatusAction, fetchLoadFavoriteFilmsAction
} from '../../store/api-actions';
import { getFavoriteFilms } from '../../store/favorite-state/selector';


type ButtonAddMyListProps = {
  idFilm: number,
}

function ButtonAddMyList({ idFilm }: ButtonAddMyListProps): JSX.Element | null {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoadFavoriteFilmsAction());
  }, [dispatch]);

  const onClickViewStatus = async () => {
    await dispatch(fetchChangeViewStatusAction({ idFilm, status: isFavorite ? 0 : 1 }));
    await dispatch(fetchLoadFavoriteFilmsAction());
  };

  if (!favoriteFilms) { return null; }
  const isFavorite = favoriteFilms.some((film) => film.id === idFilm);

  return (
    <button className="btn btn--list film-card__button"
      type="button"
      onClick={onClickViewStatus}
    >
      {
        isFavorite
          ?
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list"></use>
          </svg>
          :
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>
      }
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default ButtonAddMyList;
