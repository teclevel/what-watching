import { createSlice } from '@reduxjs/toolkit';
import { ALL_GENRES, FILMS_PER_PAGE, NameSpace } from '../../const';
import { FilmScreening } from '../../types/state';
import { getListFiltered } from '../../utils';
import { fetchLoadFilmAction, fetchLoadFilmsAction } from '../api-actions';

const initialState: FilmScreening = {
  rawFilms: [],
  isFilmsLoaded: true,
  isFilmsLoadingError: false,
  films: [],
  isFilmNotFound: false,
  filteredFilms: [],
  renderedFilmsCount: FILMS_PER_PAGE,
  filter: {
    genre: ALL_GENRES,
  },
};

export const filmScreening = createSlice({
  name: NameSpace.FilmScreening,
  initialState,
  reducers: {
    resetFilms: (state) => {
      state.filteredFilms = getListFiltered(state.rawFilms, state.filter.genre);
    },
    cutFilteredFilms: (state) => {
      state.films = getListFiltered(state.rawFilms, state.filter.genre).slice(0, state.renderedFilmsCount);
    },
    loadMoreFilms: (state) => {
      state.films = state.films.slice(0, state.renderedFilmsCount + FILMS_PER_PAGE);
      state.renderedFilmsCount += FILMS_PER_PAGE;
    },
    resetFilter: (state) => {
      state.filter.genre = ALL_GENRES;
      state.renderedFilmsCount = FILMS_PER_PAGE;
    },
    changeGenre: (state, action) => {
      state.filter.genre = action.payload;
    },
    filterByGenre: (state) => {
      state.filteredFilms = getListFiltered(state.rawFilms, state.filter.genre);
    },
    resetFilmFoundState: (state) => {
      state.isFilmNotFound = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoadFilmAction.rejected, (state) => {
        state.isFilmNotFound = true;
      })
      .addCase(fetchLoadFilmsAction.pending, (state) => {
        state.isFilmsLoaded = false;
      })
      .addCase(fetchLoadFilmsAction.fulfilled, (state, action) => {
        state.rawFilms = action.payload;
        state.isFilmsLoaded = true;
      })
      .addCase(fetchLoadFilmsAction.rejected, (state) => {
        state.isFilmsLoadingError = true;
      });
  }
});

export const { resetFilmFoundState, changeGenre, cutFilteredFilms, filterByGenre, loadMoreFilms, resetFilms, resetFilter } = filmScreening.actions;
