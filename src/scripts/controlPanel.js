export class ControlPanel {
  constructor() {
    this.viewMode = 'card';
    this.filter = '';
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
}
