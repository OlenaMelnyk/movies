import { Action } from './variables';
import './helpers';

export class Favorites {
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.delegate = null;
    this.favoritesList = document.querySelector('.favorites__list');
    this.displayFavorites(movies, favorites);
  }

  updateView(newMovies, newFavorites) {
    const newLength = newFavorites.length;
    const elementsLength = this.favoritesList.childNodes.length;

    if (newLength === elementsLength) {
      return;
    }

    if (newLength < elementsLength) {
      [...this.favoritesList.childNodes].map(elem => {
        if (!newFavorites.includes(elem.dataset.id)) {
          elem.remove();
        }
      });
    } else {
      const existingIDs = [...this.favoritesList.childNodes]
        .map(elem => elem.dataset.id);
      const newId = newFavorites.find(id => !existingIDs.includes(id));
      const movie = newMovies.findById(newId);

      this.createFavorite(movie);
    }
  }

  createFavorite(movie) {
    const favorite = document.createElement('li');

    favorite.className = 'favorites__item';
    favorite.textContent = `${movie.name}`;
    favorite.dataset.id = `${movie.id}`;

    const clearButton = document.createElement('button');

    clearButton.type = 'button';
    clearButton.dataset.id = `${movie.id}`;
    clearButton.textContent = 'X';
    clearButton.className = 'favorites__clear_button';

    clearButton.addEventListener('click', (_event) => {
      const selectedId = _event.target.dataset.id;

      _event.target.parentNode.remove();
      this.delegate.setToFavorites(selectedId, Action.REMOVE);
    });
    favorite.appendChild(clearButton);

    this.favoritesList.appendChild(favorite);
  }

  displayFavorites(movies, favorites) {
    this.favoritesList.innerHTML = '';

    favorites.map(movieId => {
      const existingMovie = movies.findById(movieId);

      if (existingMovie) {
        this.createFavorite(existingMovie);
      }
    });
  }

  setDelegate(delegate) {
    this.delegate = delegate;
  }
}
