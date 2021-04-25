import { ControlPanel } from './controlPanel';
import { MovieCards } from './movieCards';
import { MovieList } from './movieList';

export class MovieGallery {
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.controlPanel = new ControlPanel();
    this.delegate = null;

    const viewMode = this.controlPanel.getViewMode();
    // TODO
    // const filter = this.controlPanel.getFilter();
    // if (filter.length > 0) {
    //   filteredMovies();
    // }

    if (movies.length) {
      this.viewContent = (viewMode === 'card')
        ? new MovieCards(movies, favorites)
        : new MovieList(movies, favorites);
    } else {
      this.showError();
    }
  }

  setDelegate(delegate) {
    this.delegate = delegate;

    if (this.viewContent) {
      this.viewContent.setDelegate(this);
    }
  }

  updateView(newMovies, newFavorites) {
    this.viewContent.updateView(newMovies, newFavorites);
  }

  setToFavorites(id, action) {
    this.delegate.setToFavorites(id, action);
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
