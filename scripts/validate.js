const validationConfig = {
  formSelector: '.popup__item',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_invalid',
  activeButtonClass: 'popup__submit-button_valid',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

// Функция валидации
const enableValidation = ({ formSelector, ...rest }) => { // В объекте останется все, кроме formSelector
  const forms = Array.from(document.querySelectorAll(formSelector)); // Массив форм попапов (найти все формы, используя formSelector)

  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault() // Отменить поведение браузера по-умолчанию
    });
    setEventListeners(form, rest); // Установить слушатели для каждой формы
  })
}

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, inputErrorClass, ...rest }) => { // В объекте останутся ключи за исключением уже извлеченных (formSelector, inputSelector, submitButtonSelector)
  const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector)); // Массив инпутов формы (найти все формы, используя inputSelector)
  const formButton = formToValidate.querySelector(submitButtonSelector);

  disableButton(formButton, rest) // Задать кнопке неактивное состоние изначально

  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input);
      if (hasInvalidInput(formInputs)) { // Если есть невалидное поле, деактивровать кнопку
        disableButton(formButton, rest)
        input.classList.add(inputErrorClass);
      } else {
        enableButton(formButton, rest) // Если все ок, сделать активной
        input.classList.remove(inputErrorClass);
      }
    });
  });
}

// Функция проверки инпутов
const checkInputValidity = (input) => {
  const currentInputErrorContainer = document.querySelector(`#${input.id}-error`); // Находим конкретный инпут

  if (input.checkValidity()) { //true / false
    currentInputErrorContainer.textContent = '' // Оставляем пустое поле, если проходит валидацию
  } else {
    currentInputErrorContainer.textContent = input.validationMessage // Выводим ошибку, если не проходит валидацию
  }
}

// Функция проверки невалидного поля в форме
const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid) // Есть ли какое-то поле в форме, отвечающее требованию – невалидное (true/false)
}

// Функция активной кнопки 'submit'
const enableButton = (button, { inactiveButtonClass, activeButtonClass, ...rest }) => {
  button.classList.remove(inactiveButtonClass); // Удаляем класс неактивного состояния
  button.classList.add(activeButtonClass);
  button.removeAttribute('disabled') // Удаляем атрибут
}
// Функция деактивации кнопки 'submit'
const disableButton = (button, { inactiveButtonClass, activeButtonClass, ...rest }) => {
  button.classList.add(inactiveButtonClass); // Добавляем класс неактивного состояния
  button.classList.remove(activeButtonClass);
  button.setAttribute('disabled', true) // Добавляем атрибут
}

enableValidation(validationConfig)
