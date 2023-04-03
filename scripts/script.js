// Обявление переменных
// Попапы
const popupEditEl = document.querySelector('.popup_var_edit');
const popupAddEl = document.querySelector('.popup_var_add');
const popupPictureEl = document.querySelector('.popup_var_pictures');

// Кнопки открытия попапов
const popupEditOpenButtonEl = document.querySelector('.profile__edit-button');
const popupAddOpenButtonEl = document.querySelector('.profile__add-button');

// Кнопки закрытия попапов
const popupEditCloseButtonEl = document.querySelector('.popup__close-button_var_edit');
const popupAddCloseButtonEl = document.querySelector('.popup__close-button_var_add');
const popupPicCloseButtonEl = popupPictureEl.querySelector('.popup__close-button_var_pictures');

// Inputs
const nameInput = document.querySelector('.popup__field_el_name-area');
const aboutInput = document.querySelector('.popup__field_el_about-area');
const titleInput = document.querySelector('.popup__field_el_title-area');
const linkInput = document.querySelector('.popup__field_el_link-area');

// Формы попапов
const formEditEl = popupEditEl.querySelector('.popup__item_var_edit');
const formAddEl = document.querySelector('.popup__item_var_add');

// Профиль инфо
const profileNameEl = document.querySelector('.profile__name');
const profileAboutEl = document.querySelector('.profile__bio');

// Контейнер попапа с изображением
const popupPicContainer = document.querySelector('.popup__container_var_pictures');

// Карточки
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;
const initialCards = [
  {
    name: 'Колокольная',
    link: 'https://live.staticflickr.com/65535/52787095156_5304f0fe01_k.jpg'
  },
  {
    name: 'Весна в городе',
    link: 'https://live.staticflickr.com/65535/52787492130_7b662fa8f1_k.jpg'
  },
  {
    name: 'Кукуруза',
    link: 'https://live.staticflickr.com/65535/52787325274_b6c377601d_k.jpg'
  },
  {
    name: 'Мосты соединяют',
    link: 'https://live.staticflickr.com/65535/52787325344_b3efc68fc6_h.jpg'
  },
  {
    name: 'Точка зрения',
    link: 'https://live.staticflickr.com/65535/52787546168_a06b6c5d88_k.jpg'
  },
  {
    name: 'Москва-Сити',
    link: 'https://live.staticflickr.com/65535/52787325264_29b3bf9e43_k.jpg'
  }
];

// Функция открытия попапов (добавление класса)
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

// Функция закрытия попапов (удаление класса)
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener('click', function () {
  openPopup(popupEditEl);
  // Подстановка значений из профиля
  nameInput.value = profileNameEl.textContent;
  aboutInput.value = profileAboutEl.textContent;
});

// Закрытие Edit-попапа
popupEditCloseButtonEl.addEventListener('click', function () {
  closePopup(popupEditEl);
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener('click', function () {
  openPopup(popupAddEl);

});

// Закрытие Add-попапа
popupAddCloseButtonEl.addEventListener('click', function () {
  closePopup(popupAddEl);
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

// Функция создания карточки
function createCard(picTitleValue, picLinkValue) {
  // Клонирование всего содержимого li
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode(true);

  // Подставление передаваемых значений
  cardElement.querySelector('.cards__title').textContent = picTitleValue;
  cardElement.querySelector('.cards__image').src = picLinkValue;
  cardElement.querySelector('.cards__image').alt = picTitleValue;

  // Функция активного "лайка" (добавление)
  cardElement.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__like-button_active');
  });

  // Удаление карточки по клику на "мусорку"
  cardElement.querySelector('.cards__reset-button').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  // Функция открытия попапа с изображением
  cardElement.querySelector('.cards__image').addEventListener('click', function () {
    openPopup(popupPictureEl);
    createPicturePopup(picLinkValue, picTitleValue);
  });

  return cardElement;
};

// Предустановленные карточки
initialCards.forEach(card => {
  cardsContainer.prepend(createCard(card.name, card.link));
});

// Функция создания попапа с изображением
function createPicturePopup(image, subscribe) {
  popupPicContainer.querySelector('.popup__image').src = image;
  popupPicContainer.querySelector('.popup__image').alt = subscribe;
  popupPicContainer.querySelector('.popup__subscribe').textContent = subscribe;
}

// Закрытие Picture-попапа
popupPicCloseButtonEl.addEventListener('click', function () {
  closePopup(popupPictureEl);
});

// Обработчик "отправки" формы Add-попапа
formAddEl.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const picTitle = document.querySelector('.popup__field_el_title-area');
  const picLink = document.querySelector('.popup__field_el_link-area');

  // Вызов функции с передачей параметров значений
  cardsContainer.prepend(createCard(picTitle.value, picLink.value));

  picTitle.value = '';
  picLink.value = '';

  closePopup(popupAddEl);
});
