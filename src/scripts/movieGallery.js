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
    const newMovies = this.filterMovies(filter);

    if (newMovies.length) {
      this.viewContent = (this.viewMode === 'cards')
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
      return this.movies.map(movie => {
        movie.visible = movie.genres.includes(filter);

        return movie;
      });
    } else {
      return this.movies.map(movie => ({
        ...movie,
        visible: true,
      }));
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
    const prevMode = this.viewMode;
    this.viewMode = mode;

    const galleryContent = document.querySelector(`.gallery__${prevMode}`);
    console.log("galleryContent", galleryContent, `.gallery__${prevMode}`);
    [...galleryContent.children].map(child => child.remove());
    galleryContent.className = `gallery__${mode}`;
    console.log("new galleryContent", galleryContent, `.gallery__${mode}`);
    const filter = this.controlPanel.getFilter();
    const filteredMovies = this.filterMovies(filter);

    this.viewContent = (mode === 'cards')
      ? new MovieCards(filteredMovies, this.favorites)
      : new MovieList(filteredMovies, this.favorites);
    this.viewContent.setDelegate(this);
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
