export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(`${containerSelector}`);
  }
  addItem(pageElement) {
    this._container.insertAdjacentElement('beforeend', pageElement);
  }
  renderItemsList() {
    this._items.forEach((item) => this._container.insertAdjacentElement('beforeend', this._renderer(item)));
  }
}