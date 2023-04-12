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
  popupList.forEach(element => {
    const popup = element.closest('.popup');
    if (evt.key === 'Escape') {
      closePopup(popup);
    };
  });
}

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener('click', function () {
  openPopup(popupEditEl);
  // Подстановка значений из профиля
  nameInput.value = profileNameEl.textContent;
  aboutInput.value = profileAboutEl.textContent;
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener('click', function () {
  openPopup(popupAddEl);
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

  // Вызов функции с передачей параметров значений
  cardsContainer.prepend(createCard(titleInput.value, linkInput.value));

  titleInput.value = '';
  linkInput.value = '';

  closePopup(popupAddEl);
});

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
  popupImageEl.src = image;
  popupImageEl.alt = subscribe;
  popupSubscribeEl.textContent = subscribe;
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
