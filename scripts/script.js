// Обявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const profileNameEl = document.querySelector('.profile__name');
const nameInput = popupElement.querySelector('.popup__field_el_name-area');
const profileAboutEl = document.querySelector('.profile__bio');
const aboutInput = popupElement.querySelector('.popup__field_el_about-area');

// Функция добавления класса (открытия попапа)
const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

// Функция удаления класса (закрытия попапа)
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

// Открытие попапа по клику на edit
popupOpenButtonElement.addEventListener('click', function () {
  openPopup ();
  // Подстановка значения "Имя" из профиля
  nameInput.value = profileNameEl.textContent;
  // Подстановка значения "О себе" из профиля
  aboutInput.value = profileAboutEl.textContent;
});

// Закрытие попапа по клику на "крестик"
popupCloseButtonElement.addEventListener('click', closePopup);

// Находим форму в DOM
let formElement = document.querySelector('.popup__item'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Изменение "Имя" профиля
  profileNameEl.textContent = nameInput.value;

  // Изменение "О себе" профиля
  profileAboutEl.textContent = aboutInput.value;

  // Вызов функции закрытия попапа
  closePopup();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
