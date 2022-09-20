import { ALL_GENRES, AuthorizationStatus, LevelFilm, LevelFilmRange } from './const';
import { Films } from './types/films';


export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const isCheckedLogin = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Auth;


export const getLevelFilm = (level: number) => {
  if (level >= LevelFilmRange.BAD.Max && level <= LevelFilmRange.BAD.MAX) {
    return LevelFilm.BAD;
  }
  if (level > LevelFilmRange.NORMAL.MIN && level <= LevelFilmRange.NORMAL.MAX) {
    return LevelFilm.NORMAL;
  }
  if (level > LevelFilmRange.GOOD.MIN && level <= LevelFilmRange.GOOD.MAX) {
    return LevelFilm.GOOD;
  }
  if (level > LevelFilmRange.VERY_GOOD.MIN && level <= LevelFilmRange.VERY_GOOD.MAX) {
    return LevelFilm.VERY_GOOD;
  }
  if (level > LevelFilmRange.AWESOME.MIN) {
    return LevelFilm.AWESOME;
  }
};


export const convertMinutes = (timeMinutes: number) => {
  let hours = Math.trunc(timeMinutes / 60).toString();
  let minutes = (timeMinutes % 60).toString();
  switch (hours) {
    case '0': hours = '';
      break;
    default: hours = `${hours}h`;
      break;
  }

  switch (minutes) {
    case '0': minutes = '';
      break;
    default: minutes = `${minutes}m`;
      break;
  }

  return `${hours} ${minutes}`;
};


export const formatDate = (dateJson: string) => {
  const dateStr = new Date(dateJson);

  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  });
  return formatter.format(dateStr);
};


export const getListFiltered = (list: Films, genreName: string): Films => {
  if (genreName === ALL_GENRES) {
    return list;
  }
  return list.filter((film) => film.genre === genreName);
};


export const getFilmTime = (seconds: number | undefined): string => {
  if (seconds) {
    return seconds >= 3600
      ? new Date(Math.trunc(seconds) * 1000).toISOString().substring(11, 19)
      : new Date(Math.trunc(seconds) * 1000).toISOString().substring(14, 19);
  }
  return '00:00';
};

export const isValidPassword = (pass: string): boolean => {
  const re1 = new RegExp('[0-9]').test(pass);
  const re2 = new RegExp('[a-z]').test(pass);
  return (re1 && re2);
};
