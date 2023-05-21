// Кнопки открытия попапов
const popupEditOpenButtonEl = document.querySelector(".profile__edit-button");
const popupAddOpenButtonEl = document.querySelector(".profile__add-button");

// Массив со всеми кнопками закрытия попапов
const closeButtonsList = Array.from(
  document.querySelectorAll(".popup__close-button")
);

// Inputs
const titleInput = document.querySelector(".popup__field_el_title-area");
const linkInput = document.querySelector(".popup__field_el_link-area");

// Формы попапов
const formEditEl = document.querySelector(".popup__item_var_edit");
const formAddEl = document.querySelector(".popup__item_var_add");

// Массив объектов предустановленных карточек
const initialCards = [
  {
    title: "Колокольная",
    image: "https://live.staticflickr.com/65535/52787095156_5304f0fe01_k.jpg",
  },
  {
    title: "Весна в городе",
    image: "https://live.staticflickr.com/65535/52787492130_7b662fa8f1_k.jpg",
  },
  {
    title: "Кукуруза",
    image: "https://live.staticflickr.com/65535/52787325274_b6c377601d_k.jpg",
  },
  {
    title: "Мосты соединяют",
    image: "https://live.staticflickr.com/65535/52787325344_b3efc68fc6_h.jpg",
  },
  {
    title: "Точка зрения",
    image: "https://live.staticflickr.com/65535/52787546168_a06b6c5d88_k.jpg",
  },
  {
    title: "Москва-Сити",
    image: "https://live.staticflickr.com/65535/52787325264_29b3bf9e43_k.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__item",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_invalid",
  activeButtonClass: "popup__submit-button_valid",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

export {
  popupEditOpenButtonEl,
  popupAddOpenButtonEl,
  closeButtonsList,
  titleInput,
  linkInput,
  formEditEl,
  formAddEl,
  initialCards,
  validationConfig,
};
