import { NameSpace } from '../../const';
import { Films } from '../../types/films';
import { State } from '../../types/state';

export const getFilms = (state: State): Films => state[NameSpace.FilmScreening].films;
export const getRawFilms = (state: State): Films => state[NameSpace.FilmScreening].rawFilms;
export const getLoadedFilmsStatus = (state: State): boolean => state[NameSpace.FilmScreening].isFilmsLoaded;
export const getFilteredFilms = (state: State): Films => state[NameSpace.FilmScreening].filteredFilms;
export const getGenreCurrent = (state: State): string => state[NameSpace.FilmScreening].filter.genre;
export const getFilmFoundStatus = (state: State): boolean => state[NameSpace.FilmScreening].isFilmNotFound;
export const getLoadingFilmsErrorStatus = (state: State): boolean => state[NameSpace.FilmScreening].isFilmsLoadingError;
