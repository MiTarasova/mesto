// Обявление переменных
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

// Функция добавления класса (открытия попапа)
const openPopup = function () {
  popupElement.classList.add('popup_opened');
}

// Функция удаления класса (закрытия попапа)
const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}

// Открытие попапа по клику на edit
popupOpenButtonElement.addEventListener('click', openPopup);

// Закрытие попапа по клику на "крестик"
popupCloseButtonElement.addEventListener('click', closePopup);

// Подстановка значения "Имя" из профиля
const profileName = document.querySelector('.profile__name');
const editProfileName = popupElement.querySelector('.popup__field_el_name-area');
editProfileName.value = profileName.textContent;

// Подстановка значения "О себе" из профиля
const profileAbout = document.querySelector('.profile__bio');
const editProfileAbout = popupElement.querySelector('.popup__field_el_about-area');
editProfileAbout.value = profileAbout.textContent;

// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Изменение "Имя" профиля
    profileName.textContent= editProfileName.value;

    // Изменение "О себе" профиля
    profileAbout.textContent= editProfileAbout.value;

    // Вызов функции закрытия попапа
    closePopup();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
