import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"
import {
  popupEditEl, popupAddEl, popupList,
  popupEditOpenButtonEl, popupAddOpenButtonEl, closeButtonsList, nameInput,
  aboutInput, titleInput, linkInput, formEditEl, formAddEl, profileNameEl,
  profileAboutEl, initialCards, cardsContainer, validationConfig
} from "./constants.js"

// Экземпляр класса валидации для формы попапа Edit
const formEditValidator = new FormValidator(validationConfig, formEditEl);
formEditValidator.enableValidation()

// Экземпляр класса валидации для формы попапа Add
const formAddValidator = new FormValidator(validationConfig, formAddEl)
formAddValidator.enableValidation()

// Создание экземпляра карточки
function renderCard(item) {
  const card = new Card(item, '.cards__template');
  const cardElement = card.generateCard();
  return cardElement
}

// Добавление карточки в разметку
function addCard(element) {
  cardsContainer.prepend(renderCard(element))
}

// Предустановленные карточки
initialCards.forEach((item) => {
  addCard(item)
});

// Функция открытия попапов (добавление класса)
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', keyHandler);
}

// Функция закрытия попапов (удаление класса)
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler)
}

// Функция закрытия попапов при клике на Escape
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener('click', function () {
  openPopup(popupEditEl);

  // Сброс кнопки при открытии попапа
  formEditValidator.resetButtonForOpen()

  // Подстановка значений из профиля
  nameInput.value = profileNameEl.textContent;
  aboutInput.value = profileAboutEl.textContent;
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener('click', function () {
  openPopup(popupAddEl);

  // Сброс кнопки при открытии попапа
  formAddValidator.resetButtonForOpen()
});

// Обработчик «отправки» формы Edit-попапа
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Отмена стандартной отправки формы

  // Изменение параметров профиля
  profileNameEl.textContent = nameInput.value;
  profileAboutEl.textContent = aboutInput.value;

  closePopup(popupEditEl);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditEl.addEventListener('submit', handleEditFormSubmit);

// Обработчик "отправки" формы Add-попапа
formAddEl.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard({ image: linkInput.value, title: titleInput.value })

  formAddEl.reset() // Очистка значений инпутов формы

  removeInputError(formAddEl); // Удаление ошибки инпутов (нижнее подчеркивание красной линией)

  closePopup(popupAddEl);
});

// Функция удаления класса ошибки в инпутах
function removeInputError(form) {
  const inputsFormList = form.querySelectorAll('.popup__field_type_error');
  inputsFormList.forEach((input) => {
    input.classList.remove('popup__field_type_error')
  })
}

// Функция закрытия попапов по клику на крестик
closeButtonsList.forEach(button => {
  // определяем ближайший попап к элементу кнопки
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// Функция закрытия попапов по клику на оверлей
function closePopupByOverlay(evt) {
  // условие выполняется, если эл-т, который вызвал событие равен эл-ту, на который применен обработчик
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};

// Обработчик закрытия попапа при клике на overlay для каждого попапа
popupList.forEach(element => {
  element.addEventListener('click', closePopupByOverlay)
});

export { openPopup }
