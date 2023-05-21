export default class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      activeButtonClass,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._activeButtonClass = activeButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form;

    this._formInputs = Array.from(form.querySelectorAll(this._inputSelector)); // найти все формы, используя inputSelector
    this._button = form.querySelector(this._submitButtonSelector);
  }

  _setEventListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          // Если есть невалидное поле, деактивровать кнопку
          this._disableButton();
        } else {
          this._enableButton(); // Если все ок, сделать активной
        }
      });
    });
  }

  _checkInputValidity(input) {
    if (input.checkValidity()) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _getErrorContainerByInputId(id) {
    return this._form.querySelector(`#${id}-error`);
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass); // Удаляем класс неактивного состояния
    this._button.classList.add(this._activeButtonClass);
    this._button.removeAttribute("disabled"); // Удаляем атрибут
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass); // Добавляем класс неактивного состояния
    this._button.classList.remove(this._activeButtonClass);
    this._button.setAttribute("disabled", true); // Добавляем атрибут
  }

  resetValidation() {
    this._disableButton();
    this._formInputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _showInputError(input) {
    const errorContainer = this._getErrorContainerByInputId(input.id);
    input.classList.add(this._inputErrorClass);
    errorContainer.textContent = input.validationMessage;
  }

  _hideInputError(input) {
    const errorContainer = this._getErrorContainerByInputId(input.id);
    input.classList.remove(this._inputErrorClass); // Сброс ошибки инпутов
    errorContainer.textContent = ""; // Обнуление текста ошибки валидации
  }

  _hasInvalidInput() {
    return this._formInputs.some((item) => !item.validity.valid); // Есть ли какое-то поле в форме, отвечающее требованию – невалидное (true/false)
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
