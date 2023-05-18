import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._form = this._popup.querySelector(".popup__item");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__field"));
  }

  // Метод, собирающий данные всех инпутов формы
  _getInputValues() {
    this._values = {};
    this._inputList.forEach((input) => {
      this._values[input.name] = input.value;
    });
    return this._values;
  }

  // Метод, устанавливающий значение инпутов
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
      console.log(data[input.name]);
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
