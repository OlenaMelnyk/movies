export class ControlPanel {
  constructor(genres) {
    this.viewMode = 'card';
    this.gallery = document.querySelector('.gallery');
    this.filter = '';
    this.genres = genres;
    this.delegate = null;
    this.createPanelControls(genres);
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

  createPanelControls(genres) {
    const options = genres.map((genre, index) =>
      `<option value="${index + 1}">${genre}</option>`
    ).join('');

    this.gallery.insertAdjacentHTML('beforebegin',
      `
      <div class="controls">
        <select>
          <option value="0">Select genre</option>
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
}
