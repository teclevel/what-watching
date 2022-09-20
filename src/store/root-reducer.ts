import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataLoading } from './data-loading/data-loading';
import { favoriteState } from './favorite-state/favorite-state';
import { filmScreening } from './film-screening/film-screening';
import { formState } from './form-state/form-state';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.FilmScreening]: filmScreening.reducer,
  [NameSpace.DataLoading]: dataLoading.reducer,
  [NameSpace.Form]: formState.reducer,
  [NameSpace.Favorite]:favoriteState.reducer,
});
