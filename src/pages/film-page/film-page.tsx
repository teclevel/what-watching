import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ButtonAddMyList from '../../components/button-add-my-list/button-add-my-list';
import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import LoginUser from '../../components/login-user/login-user';
import Logo from '../../components/logo/logo';
import ListTabs from '../../components/tabs/list-tabs/list-tabs';
import { APIRoute, AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import {
  fetchLoadCommentsAction, fetchLoadFilmAction, fetchLoadSimilarFilmsAction
} from '../../store/api-actions';
import { getFilm, getSimilarFilms } from '../../store/data-loading/selector';
import { getFilmFoundStatus } from '../../store/film-screening/selector';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { isCheckedLogin } from '../../utils';
import LoadingScreen from '../loading-screen/loading-screen';

const SIMILAR_FILMS_COUNT = 4;

function FilmPage(): JSX.Element | null {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const isSimilarFilmsLoaded = useAppSelector(getSimilarFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFilmNotFound = useAppSelector(getFilmFoundStatus);


  useEffect(() => {
    dispatch(fetchLoadCommentsAction(id));
    dispatch(fetchLoadFilmAction(id));
    dispatch(fetchLoadSimilarFilmsAction(id));
  }, [dispatch, id]);


  if (isFilmNotFound) {
    dispatch(redirectToRoute(AppRoute.NotFound));
  }

  if (!film || !similarFilms) {
    return <LoadingScreen />;
  }

  const { name, genre, released, posterImage, backgroundImage } = film;
  const clickHandle = () => navigate(`/player/${film.id}`);

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <header className="page-header film-card__head">
            <Logo />
            <LoginUser />
          </header>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>
              <div className="film-card__buttons">
                <button onClick={clickHandle} className="btn btn--play film-card__button" type="button">
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
                {
                  isCheckedLogin(authorizationStatus)
                    ? <Link to={`${APIRoute.Films}/${id}/review`} className="btn film-card__button">Add review</Link>
                    : ''
                }
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
            </div>
            <ListTabs film={film} />
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {
            isSimilarFilmsLoaded
              ? <ListFilms films={similarFilms.slice(0, SIMILAR_FILMS_COUNT)} />
              : <LoadingScreen />
          }
        </section>
        <Footer />
      </div>
    </>
  );
}

export default FilmPage;
