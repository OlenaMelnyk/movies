import { ControlPanel } from './controlPanel';
import { MovieCards } from './movieCards';
import { MovieList } from './movieList';

export class MovieGallery {
  constructor(movies, favorites, genres) {
    this.movies = movies;
    this.favorites = favorites;
    this.controlPanel = new ControlPanel(genres);
    this.delegate = null;

    this.viewMode = this.controlPanel.getViewMode();

    const filter = this.controlPanel.getFilter();
    let newMovies = movies;

    if (filter.length > 0) {
      newMovies = this.filterMovies(filter);
    }

    if (newMovies.length) {
      this.viewContent = (this.viewMode === 'card')
        ? new MovieCards(newMovies, favorites)
        : new MovieList(newMovies, favorites);
    } else {
      this.showError();
    }
  }

  setDelegate(delegate) {
    this.delegate = delegate;
    this.controlPanel.setDelegate(this);

    if (this.viewContent) {
      this.viewContent.setDelegate(this);
    }
  }

  filterMovies(filter) {
    if (filter.length) {
      return this.movies.filter(movie => movie.genres.includes(filter));
    } else {
      return this.movies;
    }
  }

  updateView(newMovies, newFavorites) {
    this.movies = newMovies;
    this.favorites = newFavorites;

    const filter = this.controlPanel.getFilter();
    const filteredMovies = this.filterMovies(filter);

    this.viewContent.updateView(filteredMovies, newFavorites);
  }

  setToFavorites(id, action) {
    this.delegate.setToFavorites(id, action);
  }

  setFilter(filter) {
    this.filter = filter;

    const filteredMovies = this.filterMovies(filter);

    this.viewContent.updateView(filteredMovies, this.favorites);
  }

  setViewMode(mode) {
    this.viewMode = mode;
  }

  showError() {
    const gallery = document.querySelector('.gallery');

    gallery.insertAdjacentHTML('beforeend',
      `<article class="message is-danger gallery__message">
        <div class="message-header">
          <p>No data received</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          Please check if URL is correct.
        </div>
      </article>`
    );

    setTimeout(() => {
      gallery.innerHTML = '';
    }, 2000);
  }
}
