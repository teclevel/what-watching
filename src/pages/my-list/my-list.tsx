import Footer from '../../components/footer/footer';
import ListFilms from '../../components/list-films/list-films';
import Logo from '../../components/logo/logo';
import LoginUser from '../../components/login-user/login-user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/favorite-state/selector';
import LoadingScreen from '../loading-screen/loading-screen';
import { fetchLoadFavoriteFilmsAction } from '../../store/api-actions';
import { useEffect } from 'react';


function MyList(): JSX.Element | null {

  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLoadFavoriteFilmsAction());
  }, [dispatch]);

  if (!favoriteFilms) { return <LoadingScreen />; }
  const favoriteFilmsCount = favoriteFilms.length;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list
          <span className="user-page__film-count">{favoriteFilmsCount}</span>
        </h1>
        <LoginUser />
      </header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <ListFilms films={favoriteFilms} />
      </section >
      <Footer />
    </div>
  );
}

export default MyList;
