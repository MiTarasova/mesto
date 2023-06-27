// Кнопки открытия попапов
const popupEditOpenButtonEl = document.querySelector(".profile__edit-button");
const popupAddOpenButtonEl = document.querySelector(".profile__add-button");
const popupAvatarOpenButtonEl = document.querySelector(".profile__avatar-button");

// Массив со всеми кнопками закрытия попапов
const closeButtonsList = Array.from(
  document.querySelectorAll(".popup__close-button")
);

// Inputs
const nameInput = document.querySelector(".popup__field_el_title-area");
const placeLinkInput = document.querySelector(".popup__field_el_place-link");

// Формы попапов
const formEditEl = document.querySelector(".popup__item_var_edit");
const formAddEl = document.querySelector(".popup__item_var_add");
const formAvatarEl = document.querySelector(".popup__item_var_upd-avatar");

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
  popupAvatarOpenButtonEl,
  closeButtonsList,
  nameInput,
  placeLinkInput,
  formEditEl,
  formAddEl,
  formAvatarEl,
  validationConfig,
};
