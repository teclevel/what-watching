import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import FilmPage from '../../pages/film-page/film-page';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { getLoadedFilmsStatus, getLoadingFilmsErrorStatus } from '../../store/film-screening/selector';
import GoToMainPage from '../../pages/go-to-main-page/go-to-main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedFilmsStatus);
  const isFilmsLoadingError = useAppSelector(getLoadingFilmsErrorStatus);

  if (isFilmsLoadingError) {
    return <NotFoundPage />;
  }

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Main />} />

        <Route path={AppRoute.Login} element={<SignIn />} />

        <Route path={AppRoute.Film} element={<FilmPage />} />

        <Route path={AppRoute.AddReview} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <AddReview />
          </PrivateRoute>
        }
        />

        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <MyList />
          </PrivateRoute>
        }
        />

        <Route path={AppRoute.Player} element={<Player />} />

        <Route path={AppRoute.NotFound} element={<GoToMainPage />} />

      </Routes >
    </HistoryRouter >
  );
}

export default App;
