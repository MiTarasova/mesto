import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"
import {
  popupEditEl, popupAddEl, popupList, popupEditOpenButtonEl, popupAddOpenButtonEl,
  closeButtonsList, nameInput, aboutInput, titleInput, linkInput, formEditEl,
  formAddEl, profileNameEl, profileAboutEl, initialCards, cardsContainer,
  validationConfig, popupImageEl, popupSubscribeEl, popupPictureEl
} from "./constants.js"

function handleCardClick(image, title) {
  popupImageEl.src = image;
  popupImageEl.alt = title;
  popupSubscribeEl.textContent = title;
  openPopup(popupPictureEl)
}

// Экземпляр класса валидации для формы попапа Edit
const formEditValidator = new FormValidator(validationConfig, formEditEl);
formEditValidator.enableValidation()

// Экземпляр класса валидации для формы попапа Add
const formAddValidator = new FormValidator(validationConfig, formAddEl)
formAddValidator.enableValidation()

// Создание экземпляра карточки
function renderCard(item) {
  const card = new Card(item, '.cards__template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}

// Добавление карточки в разметку
function addCard(element) {
  cardsContainer.prepend(renderCard(element))
}

// Предустановленные карточки
initialCards.forEach(addCard);

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

  // Сброс кнопки и ошибок инпутов при открытии попапа
  formEditValidator.resetValidation()

  // Подстановка значений из профиля
  nameInput.value = profileNameEl.textContent;
  aboutInput.value = profileAboutEl.textContent;
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener('click', function () {
  openPopup(popupAddEl);

  formAddEl.reset() // Очистка значений инпутов формы

  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAddValidator.resetValidation()
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

  closePopup(popupAddEl);
});

// Универсальная функция закрытия попапов по клику на крестик и оверлей
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})
