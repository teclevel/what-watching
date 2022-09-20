import { useNavigate } from 'react-router-dom';
import ButtonShowMore from '../../components/button-show-more/button-show-more';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import ListGenres from '../../components/list-genres/list-genres';
import Logo from '../../components/logo/logo';
import LoginUser from '../../components/login-user/login-user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { getPromo } from '../../store/data-loading/selector';
import { getFilms, getFilteredFilms } from '../../store/film-screening/selector';
import { cutFilteredFilms, filterByGenre, loadMoreFilms, resetFilms, resetFilter } from '../../store/film-screening/film-screening';
import ButtonAddMyList from '../../components/button-add-my-list/button-add-my-list';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { isCheckedLogin } from '../../utils';

function Main(): JSX.Element | null {
  const films = useAppSelector(getFilms);
  const filteredFilms = useAppSelector(getFilteredFilms);
  const promo = useAppSelector(getPromo);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const { id, backgroundImage, posterImage, name, genre, released } = promo ?? {};

  const dispatch = useAppDispatch();

  useEffect(() => () => {
    dispatch(resetFilter());
    dispatch(cutFilteredFilms());
    dispatch(resetFilms());
  }, [dispatch]);

  const navigate = useNavigate();
  const onClickPlayHandler = () => {
    if (!id) { return; }
    navigate(`/player/${id.toString()}`);
  };

  const showMoreButtonClickHandle = () => {
    dispatch(loadMoreFilms());
    dispatch(filterByGenre());
    dispatch(cutFilteredFilms());
  };

  if (!promo) { return null; }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header film-card__head">
          <Logo />
          <LoginUser />
        </header>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button"
                  type="button"
                  onClick={onClickPlayHandler}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  isCheckedLogin(authorizationStatus)
                    ? <ButtonAddMyList idFilm={Number(id)} />
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <ListGenres />
          <ListFilms films={films} />
          {
            filteredFilms.length <= films.length
              ? ''
              : <ButtonShowMore onClick={showMoreButtonClickHandle} />
          }
        </section>
        <Footer />
      </div>
    </>
  );
}

export default Main;
