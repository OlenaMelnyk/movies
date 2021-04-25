import { MovieDetails } from './movieDetails';
import './helpers';

export class MovieCards {
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.gallery = document.querySelector('.gallery__content');
    this.movieDetails = new MovieDetails();
    this.delegate = null;
    this.createMovieCards(movies, favorites);
    this.setListeners();
  }

  createMovieCards(movies, favorites) {
    movies.map(movie => {
      const isFavorite = favorites.includes('' + movie.id);

      this.gallery.insertAdjacentHTML('beforeend',
        `<div class='movie' data-id=${movie.id}>
          <img class='movie__image' src=${movie.img} alt="">
          <h2 class='movie__name'>${movie.name}</h2>
          <p class='movie__year'>${movie.year}</p>
          <div class='movie__star' data-id=${movie.id}></div>
        </div>`
      );

      if (isFavorite) {
        const lastAdded = this.gallery.lastChild;

        lastAdded.querySelector('.movie__star')
          .classList.add('movie__star--active');
      }
    });
  }

  setListeners() {
    const stars = this.gallery.querySelectorAll('.movie__star');
    const movieCards = this.gallery.querySelectorAll('.movie');

    [...stars].map(star => star.addEventListener('click', (_event) => {
      _event.stopPropagation();

      const selectedId = _event.target.dataset.id;

      _event.target.classList.toggle('movie__star--active');

      this.delegate.setToFavorites(selectedId);
    }));

    [...movieCards].map(movie => movie.addEventListener('click', (_event) => {
      const chosenId = _event.target.closest('.movie').dataset.id;
      const foundMovie = this.movies.findById(chosenId);
      const isFavorite = this.favorites.includes('' + foundMovie.id);

      this.movieDetails.showDetails(foundMovie, isFavorite);
    }));
  }

  setDelegate(delegate) {
    this.delegate = delegate;
    this.movieDetails.setDelegate(this);
  }

  setToFavorites(id, action) {
    this.delegate.setToFavorites(id, action);
  }

  updateView(newMovies, newFavorites) {
    this.movies = newMovies;
    this.favorites = newFavorites;

    [...this.gallery.children].map(movieCard => {
      const movie = newMovies.findById(movieCard.dataset.id);
      const isFavorite = newFavorites.includes('' + movie.id);

      if (isFavorite) {
        movieCard.querySelector('.movie__star')
          .classList.add('movie__star--active');
      } else {
        movieCard.querySelector('.movie__star').className = 'movie__star';
      }
    });
  }
}
