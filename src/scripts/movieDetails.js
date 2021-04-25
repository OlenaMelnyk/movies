export class MovieDetails {
  constructor(movie) {
    this.isVisible = false;
    this.movie = movie;
    this.delegate = null;
    this.gallery = document.querySelector('.gallery');
  }

  updateView(movie, isFavorite) {
    // eslint-disable-next-line
    console.log('updateView detail', movie, isFavorite);
  }

  showDetails(movie, isFavorite) {
    if (this.isVisible) {
      // TODO
      // const starElement = document.querySelector('.details__star');

      this.updateView(movie, isFavorite);
    } else {
      const genres = movie.genres
        .map(genre => `<span class='details__genre'>${genre}</span>`)
        .join('');

      this.gallery.insertAdjacentHTML('beforeend',
        `<article class="message details gallery__details is-info">
          <div class="message-header">
            <p></p>
            <button class="delete" id="close" aria-label="delete"></button>
          </div>
          <div class="message-body details__content">
            <div class="details__leftPart">
            <img class='details__image' src=${movie.img} alt="">
              <div class="details__wrapper">
                <div class='details__star' data-id=${movie.id}></div>
                <p class='details__year'>${movie.year}</p>
              </div>
              <div class='details__genres'>
                ${genres}
              </div>
            </div>
            <div class="details__rightPart">
              <div class="details__topPart">
                <h2 class='details__name'>${movie.name}</h2>
                <p class='details__description'>${movie.description}</p>
              </div>
              <div class='details__bottomPart'>
                <p class='details__director'>
                  <strong>Director:</strong> ${movie.director}
                </p>
                <p class='details__starring'>
                  <strong>Starring:</strong> ${movie.starring.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </article>`
      );
      this.isVisible = true;

      const starElement = document.querySelector('.details__star');

      if (isFavorite) {
        starElement.classList.add('details__star--active');
      }

      starElement.addEventListener('click', (_event) => {
        _event.stopPropagation();
        _event.target.classList.toggle('details__star--active');
        this.delegate.setToFavorites('' + movie.id);
      });

      document.querySelector('#close').addEventListener('click', _event => {
        _event.target.closest('.details').remove();
        this.isVisible = false;
      });
    }
  }

  setDelegate(delegate) {
    this.delegate = delegate;
  }
}
