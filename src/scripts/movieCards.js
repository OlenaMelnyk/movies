import { MovieDetails } from './movieDetails';
import './helpers';

export class MovieCards {
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.galleryContent = document.querySelector('.gallery__cards');
    this.movieDetails = new MovieDetails();
    this.delegate = null;
    this.createMovieCards(movies, favorites);
    this.setListeners();
  }

  createMovieCards(movies, favorites) {
    movies.map(movie => {
      const displayType = movie.visible ? 'block' : 'none';
      const isFavorite = favorites.includes('' + movie.id);

      this.galleryContent.insertAdjacentHTML('beforeend',
        `<div
          class='cardmovie'
          data-id=${movie.id}
          style="display:${displayType}"
        >
          <img class='cardmovie__image' src=${movie.img} alt="">
          <h2 class='cardmovie__name'>${movie.name}</h2>
          <p class='cardmovie__year'>${movie.year}</p>
          <div class='cardmovie__star' data-id=${movie.id}></div>
        </div>`
      );

      if (isFavorite) {
        const lastAdded = this.galleryContent.lastChild;

        lastAdded.querySelector('.cardmovie__star')
          .classList.add('cardmovie__star--active');
      }
    });
  }

  setListeners() {
    const stars = this.galleryContent.querySelectorAll('.cardmovie__star');
    const movieCards = this.galleryContent.querySelectorAll('.cardmovie');

    [...stars].map(star => star.addEventListener('click', (_event) => {
      _event.stopPropagation();

      const selectedId = _event.target.dataset.id;

      _event.target.classList.toggle('cardmovie__star--active');

      this.delegate.setToFavorites(selectedId);
    }));

    [...movieCards].map(movie => movie.addEventListener('click', (_event) => {
      const chosenId = _event.target.closest('.cardmovie').dataset.id;
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

    [...this.galleryContent.children].map(movieCard => {
      const movie = newMovies.findById(movieCard.dataset.id);

      if (movie.visible) {
        movieCard.style.display = 'block';

        const isFavorite = newFavorites.includes('' + movie.id);

        if (isFavorite) {
          movieCard.querySelector('.cardmovie__star')
            .classList.add('cardmovie__star--active');
        } else {
          movieCard.querySelector('.cardmovie__star')
            .className = 'cardmovie__star';
        }
      } else {
        movieCard.style.display = 'none';
      }
    });
  }
}
