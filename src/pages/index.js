import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  popupEditOpenButtonEl,
  popupAddOpenButtonEl,
  titleInput,
  linkInput,
  formEditEl,
  formAddEl,
  initialCards,
  validationConfig,
} from "../scripts/utils/constants.js";
import "./index.css";

const userInfo = new UserInfo({
  userName: ".profile__name",
  userAbout: ".profile__bio",
});

// Экземпляр класса попапа с формой для "Редактирование профиля"
const popupEditObj = new PopupWithForm(".popup_var_edit", (item) => {
  // Подстановка новых значений инпутов
  userInfo.setUserInfo(item);
});

// Экземпляр класса попапа с формой для "Новое место"
const popupAddObj = new PopupWithForm(".popup_var_add", () => {
  renderCard({ image: linkInput.value, title: titleInput.value });
});

const popupImageObj = new PopupWithImage(".popup_var_pictures");

// Создание новой секции для карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards"
);
cardList.renderItems();

// Экземпляр класса валидации для формы попапа Edit
const formEditValidator = new FormValidator(validationConfig, formEditEl);
formEditValidator.enableValidation();

// Экземпляр класса валидации для формы попапа Add
const formAddValidator = new FormValidator(validationConfig, formAddEl);
formAddValidator.enableValidation();

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener("click", () => {
  popupEditObj.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  // Подстановка значений из профиля
  popupEditObj.setInputValues(userData);
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener("click", function () {
  popupAddObj.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAddValidator.resetValidation();
});

// Добавление карточек в разметку
function renderCard(item) {
  const cardElement = createCard(item);
  cardList.addItem(cardElement);
}

// Создание экземпляра карточки
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: (image, title) => {
        popupImageObj.open(image, title);
      },
    },
    ".cards__template"
  );
  return card.generateCard();
}
