export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items; // Массив данных, который нужно добавить при инициализации класса
    this._renderer = renderer; // Функция, отвечающая за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  // Метод, отвечающий за отрисовку всех элементов
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод, принимающий DOM-элемент и вставляющий его в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
