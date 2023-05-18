export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  // Открытие папапа
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
    this._handleEscClose();
  }

  // Закрытие папапа
  close() {
    this._popup.classList.remove("popup_opened");
  }

  // Закрытие папапа по Esc
  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  // Слушатели клика по крестику и overlay
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
