import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FavoriteState } from '../../types/state';
import { fetchLoadFavoriteFilmsAction } from '../api-actions';

const initialState: FavoriteState = {
  favoriteFilms: [],
};

export const favoriteState = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLoadFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});
