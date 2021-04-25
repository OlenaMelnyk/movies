export class MovieList {
  constructor(movies, favorites) {
    this.movies = movies;
    this.favorites = favorites;
    this.delegate = null;
  }

  updateView(newMovies, newFavorites) {
    // TODO
    // console.log('updateView list', newMovies, newFavorites);
  }

  setDelegate(delegate) {
    this.delegate = delegate;
  }
}
