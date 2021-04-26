export class ControlPanel {
  constructor(genres) {
    this.viewMode = 'card';
    this.gallery = document.querySelector('.gallery');
    this.filter = '';
    this.genres = genres;
    this.delegate = null;
    this.createPanelControls(genres);
    this.addListeners();
  }

  getViewMode() {
    return this.viewMode;
  }

  setViewMode(newMode) {
    this.viewMode = newMode;
  }

  getFilter() {
    return this.filter;
  }

  setFilter(newFilter) {
    this.filter = newFilter;
  }

  setDelegate(delegate) {
    this.delegate = delegate;
  }

  createPanelControls(genres) {
    const options = genres.map((genre, index) =>
      `<option value="${genre}">${genre}</option>`
    ).join('');

    this.gallery.insertAdjacentHTML('beforebegin',
      `
      <div class="controls">
        <select class="select">
          <option value="">All</option>
          ${options}
        </select>
        
        <div class="controls__tabs tabs">
          <span class="tabs__title">View as:</span>
          <button
            type="button"
            id="1"
            class="tabs__tab tabs__view tabs__tab-selected"
          />
          <button type="button" id="2" class="tabs__tab tabs__list" />
        </div>
      </div>
    `);
  }

  addListeners() {
    const tab = document.querySelector('.controls__tabs');
    const select = document.querySelector('.select');

    select.addEventListener('change', (_event) => {
      // console.log(_event.target.value);
      const filter = _event.target.value;

      this.filter = filter;
      this.delegate && this.delegate.setFilter(filter);
    });

    tab.addEventListener('click', (_event) => {
      // console.log(_event.target.id);
      this.delegate
        && this.delegate.setViewMode(_event.target.id === 1 ? 'card' : 'list');
    });
  }
}
