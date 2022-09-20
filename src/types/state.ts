import { AuthorizationStatus } from '../const.js';
import { store } from '../store/index.js';
import { Film, Films } from './films.js';
import { Reviews } from './reviews.js';


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

export type Filter = {
  genre: string;
}
export type FilmScreening = {
  rawFilms: Films,
  isFilmsLoaded: boolean,
  isFilmsLoadingError: boolean,
  films: Films,
  isFilmNotFound: boolean,
  filteredFilms: Films,
  renderedFilmsCount: number;
  filter: Filter;
};

export type DataLoading = {
  similarFilms: Films,
  isSimilarFilmsLoaded: boolean,
  film: undefined | Film,
  promo: undefined | Film,
  isPromoLoaded: boolean,
  comments: Reviews,
  isCommentsLoaded: boolean,
}

export type Form = {
  isFormDisabled: boolean,
}

export type FavoriteState = {
  favoriteFilms: Films,
}
