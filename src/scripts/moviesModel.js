import { getFromLocalStorage, updateInLocalStorage } from './api';

const favoritesKey = 'favorites';

export class MoviesModel {
  constructor() {
    this.movies = [];
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers.filter(currentObserver => currentObserver !== observer);
  }

  getMovies() {
    return this.movies;
  }

  setMovies(newMovies) {
    this.movies = newMovies;

    for (const observer of this.observers) {
      observer.updateView();
    }
  }

  getFavorites() {
    return getFromLocalStorage(favoritesKey, []);
  }

  setToFavorites(id, action) {
    updateInLocalStorage(favoritesKey, id, action);

    for (const observer of this.observers) {
      observer.updateView();
    }
  }

  getGenres() {
    const allGenres = this.movies
      .reduce((genres, movie) => genres.concat(movie.genres), [])
      .map(genre => genre.slice(0, 1).toUpperCase() + genre.slice(1));
    const uniqueGenres = Array.from(new Set(allGenres));

    return uniqueGenres;
  }
};
