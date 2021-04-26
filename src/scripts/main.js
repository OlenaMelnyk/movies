import 'bulma/css/bulma.css';
import { MoviesModel } from './moviesModel';
import { MovieGallery } from './movieGallery';
import { Favorites } from './favorites';
import { getMovies } from './api';

// debugger;

class Controller {
  constructor() {
    this.model = new MoviesModel();
    this.movieGallery = null;
    this.movieFavorites = null;
  }

  loadData = async() => {
    const moviesFromServer = await getMovies();

    this.initialize(moviesFromServer);
  };

  initialize(moviesFromServer) {
    const model = this.model;

    model.setMovies(moviesFromServer);
    model.addObserver(this);

    const movies = model.getMovies();
    const favorites = model.getFavorites();
    const genres = model.getGenres();

    this.movieGallery = new MovieGallery(movies, favorites, genres);
    this.movieFavorites = new Favorites(movies, favorites);
    this.movieGallery.setDelegate(this);
    this.movieFavorites.setDelegate(this);
  }

  updateView() {
    const model = this.model;
    const movies = model.getMovies();
    const favorites = model.getFavorites();

    this.movieGallery.updateView(movies, favorites);
    this.movieFavorites.updateView(movies, favorites);
  }

  setToFavorites(id, action) {
    this.model.setToFavorites(id, action);
  }
}

const controller = new Controller();

controller.loadData();
