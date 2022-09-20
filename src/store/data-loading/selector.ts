import { NameSpace } from '../../const';
import { Film, Films } from '../../types/films';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';

export const getSimilarFilms = (state: State): Films | undefined => state[NameSpace.DataLoading].similarFilms;
export const getLoadedDataSimilarStatus = (state: State): boolean => state[NameSpace.DataLoading].isSimilarFilmsLoaded;

export const getFilm = (state: State): Film | undefined => state[NameSpace.DataLoading].film;

export const getPromo = (state: State): Film | undefined => state[NameSpace.DataLoading].promo;
export const getLoadedDataPromoStatus = (state: State): boolean => state[NameSpace.DataLoading].isPromoLoaded;

export const getComments = (state: State): Reviews | undefined => state[NameSpace.DataLoading].comments;
export const getLoadedDataCommentsStatus = (state: State): boolean => state[NameSpace.DataLoading].isCommentsLoaded;
