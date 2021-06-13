export class ControlPanel {
  constructor(genres) {
    this.viewMode = 'cards';
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
            id="cards"
            class="tabs__tab tabs__card tabs__tab-selected"
          />
          <button
            type="button"
            id="list"
            class="tabs__tab tabs__list"
          />
        </div>
      </div>
    `);
  }

  addListeners() {
    const tabControl = document.querySelector('.controls__tabs');
    const select = document.querySelector('.select');

    select.addEventListener('change', (_event) => {
      const filter = _event.target.value;

      this.filter = filter;
      this.delegate && this.delegate.setFilter(filter);
    });

    tabControl.addEventListener('click', (_event) => {
      const chosenTab = _event.target.id;
      const tabs = tabControl.querySelectorAll('.tabs__tab');

      [...tabs].forEach(tab => {
        tab.classList.toggle('tabs__tab-selected');
      });

      if (this.viewMode !== chosenTab) {
        this.viewMode = chosenTab;
        this.delegate && this.delegate.setViewMode(chosenTab);
      }
    });
  }
}
