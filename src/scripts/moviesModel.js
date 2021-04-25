import { getFromLocalStorage, updateInLocalStorage } from './api';

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
    return getFromLocalStorage('favorites', []);
  }

  setToFavorites(id, action) {
    updateInLocalStorage('favorites', id, action);

    for (const observer of this.observers) {
      observer.updateView();
    }
  }
};
