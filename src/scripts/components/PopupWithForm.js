import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__item");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__field"));
    this._submitButton = this._popup.querySelector(".popup__submit-button");
    this._defaultButton = this._submitButton.textContent;
  }

  // Метод, собирающий данные всех инпутов формы
  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Метод, устанавливающий значение инпутов
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // Обработчик сабмита
  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._submitFunction(this._getInputValues());
    this._setLoadingButtonSave();
  };

  // Установка слушателя на сабмит
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  _setLoadingButtonSave() {
    this._submitButton.textContent = "Сохранение...";
  }

  setDefaultButton() {
    this._submitButton.textContent = this._defaultButton;
  }

  // Метод для снятия слушателей
  _unsetEventListeners() {
    super._unsetEventListeners();
    this._form.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    // Сброс значений инпутов формы
    this._form.reset();
  }
}
