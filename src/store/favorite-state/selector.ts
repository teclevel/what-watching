import { NameSpace } from '../../const';
import { Films } from '../../types/films';
import { State } from '../../types/state';

export const getFavoriteFilms = (state: State): Films | undefined => state[NameSpace.Favorite].favoriteFilms;
