import { MovieDetails } from './movieDetails';
import './helpers';

export class MovieList {  
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.galleryContent = document.querySelector('.gallery__list');
    this.movieDetails = new MovieDetails();
    this.delegate = null;
    this.createMovieCards(movies, favorites);
    this.setListeners();
  }

  createMovieCards(movies, favorites) {
    movies.map(movie => {
      const displayType = movie.visible ? 'flex' : 'none';
      const isFavorite = favorites.includes('' + movie.id);

      const genres = movie.genres
        .map(genre => `<span class='details__genre'>${genre}</span>`)
        .join('');

      this.galleryContent.insertAdjacentHTML('beforeend',
        `<div
          class='listmovie'
          data-id=${movie.id}
          style="display:${displayType}"
        >
          <div class="listmovie__leftPart">
            <img class='listmovie__image' src=${movie.img} alt="">
          </div>
          <div class="listmovie__rightPart">
            <div class="listmovie__topPart">
              <div class="listmovie__combine">
                <h2 class='listmovie__name'>${movie.name}</h2>
                <p class='listmovie__year'>${movie.year}</p>
              </div>
              <div class='listmovie__star' data-id=${movie.id}></div>
              <p class='listmovie__description'>${movie.description}</p>
            </div>
            <div class='listmovie__genres'>
              ${genres}
            </div>
          </div>
        </div>`
      );

      if (isFavorite) {
        const lastAdded = this.galleryContent.lastChild;

        lastAdded.querySelector('.listmovie__star')
          .classList.add('listmovie__star--active');
      }
    });
  }

  setListeners() {
    const stars = this.galleryContent.querySelectorAll('.listmovie__star');
    const movieCards = this.galleryContent.querySelectorAll('.listmovie');

    [...stars].map(star => star.addEventListener('click', (_event) => {
      _event.stopPropagation();

      const selectedId = _event.target.dataset.id;

      _event.target.classList.toggle('listmovie__star--active');

      this.delegate.setToFavorites(selectedId);
    }));

    [...movieCards].map(movie => movie.addEventListener('click', (_event) => {
      const chosenId = _event.target.closest('.listmovie').dataset.id;
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
        movieCard.style.display = 'flex';

        const isFavorite = newFavorites.includes('' + movie.id);

        if (isFavorite) {
          movieCard.querySelector('.listmovie__star')
            .classList.add('listmovie__star--active');
        } else {
          movieCard.querySelector('.listmovie__star')
            .className = 'listmovie__star';
        }
      } else {
        movieCard.style.display = 'none';
      }
    });
  }
}
  