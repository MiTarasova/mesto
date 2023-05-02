class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass,
    activeButtonClass, inputErrorClass, errorClass }, form) {
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._activeButtonClass = activeButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._form = form

    this._formInputs = Array.from(form.querySelectorAll(this._inputSelector)); // найти все формы, используя inputSelector
    this._button = form.querySelector(this._submitButtonSelector)
  }

  _setEventListeners() {
    this._formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) { // Если есть невалидное поле, деактивровать кнопку
          this._disableButton()
          input.classList.add(this._inputErrorClass);
        } else {
          this._enableButton() // Если все ок, сделать активной
          input.classList.remove(this._inputErrorClass);
        }
      })
    });
  }

  _checkInputValidity() {
    this._input = this._form.querySelector(this._inputSelector)
    const inputErrorContainer = this._form.querySelector(`#${this._input.id}-error`)

    if (this._input.checkValidity()) { //true / false
      inputErrorContainer.textContent = '' // Оставляем пустое поле, если проходит валидацию
    } else {
      inputErrorContainer.textContent = this._input.validationMessage // Выводим ошибку, если не проходит валидацию
    }
  }

  _enableButton() {
    this._button.classList.remove(this._inactiveButtonClass); // Удаляем класс неактивного состояния
    this._button.classList.add(this._activeButtonClass);
    this._button.removeAttribute('disabled') // Удаляем атрибут
  }

  _disableButton() {
    this._button.classList.add(this._inactiveButtonClass); // Добавляем класс неактивного состояния
    this._button.classList.remove(this._activeButtonClass);
    this._button.setAttribute('disabled',true) // Добавляем атрибут
  }

  _hasInvalidInput() {
    return this._formInputs.some((item) => !item.validity.valid) // Есть ли какое-то поле в форме, отвечающее требованию – невалидное (true/false)
  }

  resetButtonForOpen() {
    this._disableButton()
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }
}

export { FormValidator }
