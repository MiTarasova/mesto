export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  // Открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  // Закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  // Обработчик закрытия попапа по клику на крестик и оверлей
  _handleCloseByClick = (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  };

  // Обработчик закрытия попапа по Esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // Слушатели клика и Esc
  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleCloseByClick);
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Метод для снятия слушателей
  _removeEventListeners() {
    this._popup.removeEventListener("mousedown", this._handleCloseByClick);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
