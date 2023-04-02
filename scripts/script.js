// Обявление переменных
// Попапы
const popupEditEl = document.querySelector('.popup_var_edit');
const popupAddEl = document.querySelector('.popup_var_add');

const popupTemplate = document.querySelector('.popup__template').content;
const popupPictureEl = document.querySelector('.popup_var_pictures');

// Кнопки открытия попапов
const popupEditOpenButtonEl = document.querySelector('.profile__edit-button');
const popupAddOpenButtonEl = document.querySelector('.profile__add-button');

// Кнопки закрытия попапов
const popupEditCloseButtonEl = document.querySelector('.popup__close-button_var_edit');
const popupAddCloseButtonEl = document.querySelector('.popup__close-button_var_add');

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

// Карточки
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;
const cardsItemElement = cardTemplate.querySelector('.cards__item');
const initialCards = [
  {
    name: 'Колокольная',
    link: 'https://4.downloader.disk.yandex.ru/preview/156ed56c006ac14f8b8f64f2191b59c460f0861ce7ca860a7350cdad50d16ede/inf/1Z-ywmiySuBw55olUa_gAOoBuJvoae-Z1uiVIiNF7nIt5PJQfU7WkkZc5ZEtv07OqCKsIAgv_0OrshwoZEbT5g%3D%3D?uid=1717244569&filename=Kolokolnaya.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  },
  {
    name: 'Весна в городе',
    link: 'https://3.downloader.disk.yandex.ru/preview/af1b10a7b885c1a4892195df0f97bba1f7fe70345df6cba8ee401befd2b6d9a8/inf/2mZvDnefVdbQPok6I5Ci9OoBuJvoae-Z1uiVIiNF7nJbH73wNPYadm4OLwbiRwexMh3q2oEF5QEy-7jNRWaakw%3D%3D?uid=1717244569&filename=Krasnaya-ploshad%27.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  },
  {
    name: 'Кукуруза',
    link: 'https://4.downloader.disk.yandex.ru/preview/87cfa1c86c57a0e81324aaefea3d1f4eddfcea67ad32801fb186ed71d8340f26/inf/7giTsrW-EZn1PH1PtCfaZuoBuJvoae-Z1uiVIiNF7nJBd8q7UKXgcVxfSGTE7OhSp7cwrVaRT_caAmXXS5560A%3D%3D?uid=1717244569&filename=Lahta.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  },
  {
    name: 'Мосты соединяют',
    link: 'https://3.downloader.disk.yandex.ru/preview/70babeeaec011955a35c27c2ac667d5fa233a6c260e36f1c582af2a7afc48bb7/inf/ttaExPr27nU8LoKCecDzy-oBuJvoae-Z1uiVIiNF7nIt5cop8qw1nY3cKaC3nkicicFszezRkkm8NiCnrojGew%3D%3D?uid=1717244569&filename=ZSD.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  },
  {
    name: 'Точка зрения',
    link: 'https://3.downloader.disk.yandex.ru/preview/122130fd1991c3b0b4e0a132e512a93c56bd0c5f3847e3999e4b2503c5d79403/inf/dnGZeIlukOlB_LpBWc6RnOoBuJvoae-Z1uiVIiNF7nKdWXP9HcoBVVfduIUEtZZFZt9iN3P0IOyrX58sUfSmOw%3D%3D?uid=1717244569&filename=Murmansk.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  },
  {
    name: 'Москва-Сити',
    link: 'https://1.downloader.disk.yandex.ru/preview/7427cfa5bb571dde487f2f8a384e1dc71783e8723d23adeaf8e052a1aeff3170/inf/QvgMi2NBo7POc3n9aS2_RuoBuJvoae-Z1uiVIiNF7nKRbav6eWS95K3APa03AxgFw3-flT-soZcNHP1xAW441A%3D%3D?uid=1717244569&filename=Moskva-city.JPG&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1717244569&tknv=v2&size=3970x2102'
  }
];

// Функция открытия попапа (добавление класса)
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener('click', function () {
  togglePopup(popupEditEl);
  // Подстановка значения "Имя" из профиля
  nameInput.value = profileNameEl.textContent;
  // Подстановка значения "О себе" из профиля
  aboutInput.value = profileAboutEl.textContent;
});

// Закрытие Edit-попапа (удаления класса)
popupEditCloseButtonEl.addEventListener('click', function () {
  togglePopup(popupEditEl);
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener('click', function () {
  togglePopup(popupAddEl);
});

// Закрытие Add-попапа (удаления класса)
popupAddCloseButtonEl.addEventListener('click', function () {
  togglePopup(popupAddEl);
});

// Обработчик «отправки» формы Edit-попапа
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Изменение "Имя" профиля
  profileNameEl.textContent = nameInput.value;

  // Изменение "О себе" профиля
  profileAboutEl.textContent = aboutInput.value;

  // Вызов функции закрытия попапа
  togglePopup(popupEditEl);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEditEl.addEventListener('submit', handleFormSubmit);

// Предустановленные карточки
initialCards.forEach(card => { createCard(card.name, card.link); });

// Создание карточки
function createCard(picTitleValue, picLinkValue) {
  // Клонирование всего содержимого li
  const cardElement = cardsItemElement.cloneNode(true);

  // Подставление передаваемых значений
  cardElement.querySelector('.cards__title').textContent = picTitleValue;
  cardElement.querySelector('.cards__image').src = picLinkValue;
  cardElement.querySelector('.cards__image').alt = picTitleValue;

  // Подстановка карточки в контейнер ul
  cardsContainer.append(cardElement);

  // Функция активного "лайка" (добавление)
  cardElement.querySelector('.cards__like-button').addEventListener('click', function (evt) {
    // Добавление и удаление селектора активности "лайка"
    evt.target.classList.toggle('cards__like-button_active');
  });

  // Удаление карточки по клику на "мусорку"
  cardElement.querySelector('.cards__reset-button').addEventListener('click', function (evt) {
    evt.target.closest('.cards__item').remove();
  });

  // Функция открытия попапа с изображением
  cardElement.querySelector('.cards__image').addEventListener('click', function () {
    togglePopup(popupPictureEl);
    createPicturePopup(picTitleValue, picLinkValue)
  });
};

  // Создание попапа с изображением
function createPicturePopup(picSubscribeValue, pickImageValue) {
  // Клонирование всего содержимого div
  const pictureElement = popupTemplate.querySelector('.popup__container_var_pictures').cloneNode(true);

  // Подставление передаваемых значений
  pictureElement.querySelector('.popup__subscribe').textContent = picSubscribeValue;
  pictureElement.querySelector('.popup__image').src = pickImageValue;

  // Подстановка карточки в контейнер ul
  popupPictureEl.append(pictureElement);
}

const picpic = document.querySelector('.popup__close-button_var_pictures')
picpic.addEventListener('click', function () {
  togglePopup(popupPictureEl);
});

// Обработчик "отправки" формы Add-попапа
formAddEl.addEventListener('submit', function (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const picTitle = document.querySelector('.popup__field_el_title-area');
  const picLink = document.querySelector('.popup__field_el_link-area');

  // Вызов функции с передачей параметров значений
  createCard(picTitle.value, picLink.value);

  picTitle.value = '';
  picLink.value = '';

  // Закрытие попапа
  togglePopup(popupAddEl);
});
