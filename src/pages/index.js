import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  popupEditOpenButtonEl,
  popupAddOpenButtonEl,
  popupAvatarOpenButtonEl,
  nameInput,
  placeLinkInput,
  formEditEl,
  formAddEl,
  formAvatarEl,
  validationConfig,
} from "../scripts/utils/constants.js";
import { api } from "../scripts/components/Api.js";
import "./index.css";

// создание карточки и отправка ее данных на сервер
const submitAddCardForm = (data) => {
  api
    .createNewCard(data)
    .then((res) => {
      renderCard(res);
      popupAddCard.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddCard.setDefaultButton();
    });
};

// Создание новой секции для карточек
const cardList = new Section(
  {
    renderer: renderCard,
  },
  ".cards"
);

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
      handleCardClick: (link, name) => {
        popupImage.open(link, name);
      },
      handleCardDelete: (card, id) => {
        popupDeleteCard.open(card, id);
      },
      handleCardLike: (id) => {
        const isLike = card.isLike();
        if (!isLike) {
          api
            .likeCard(id)
            .then((res) => {
              card.setLike(res.likes);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          api
            .deleteLike(id)
            .then((res) => {
              card.removeLike(res.likes);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      },
    },
    ".cards__template"
  );
  return card.generateCard();
}

const userInfo = new UserInfo({
  userName: ".profile__name",
  userAbout: ".profile__bio",
  userAvatar: ".profile__avatar",
});

// Экземпляр класса попапа с формой для "Редактирование профиля"
const popupEditProfile = new PopupWithForm(".popup_var_edit", (item) => {
  api
    .newUserInfo(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupEditProfile.setDefaultButton();
    });
});

// Экземпляр класса попапа с формой для "Новое место"
const popupAddCard = new PopupWithForm(".popup_var_add", () => {
  submitAddCardForm({ link: placeLinkInput.value, name: nameInput.value });
});

// Экземпляр класса попапа с формой для "Обновить аватар"
const popupEditAvatar = new PopupWithForm(".popup_var_upd-avatar", (item) => {
  api
    .newUserAvatar(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupEditAvatar.setDefaultButton();
    });
});

const popupImage = new PopupWithImage(".popup_var_pictures");

const popupDeleteCard = new PopupWithConfirmation(
  ".popup_var_confirm",
  (card, id) => {
    api
      .deleteCard(id)
      .then(() => {
        card.removeCard();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

// Экземпляр класса валидации для формы попапа Edit
const formEditValidator = new FormValidator(validationConfig, formEditEl);
formEditValidator.enableValidation();

// Экземпляр класса валидации для формы попапа Add
const formAddValidator = new FormValidator(validationConfig, formAddEl);
formAddValidator.enableValidation();

// Экземпляр класса валидации для формы попапа "Обновить аватар"
const formAvatarValidator = new FormValidator(validationConfig, formAvatarEl);
formAvatarValidator.enableValidation();

// Открытие попапа "Редактирование профиля" по клику на edit
popupEditOpenButtonEl.addEventListener("click", () => {
  popupEditProfile.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  // Подстановка значений из профиля
  popupEditProfile.setInputValues(userData);
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener("click", () => {
  popupAddCard.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAddValidator.resetValidation();
});

// Открытие попапа "Обновить аватар" по клику на аву
popupAvatarOpenButtonEl.addEventListener("click", () => {
  popupEditAvatar.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAvatarValidator.resetValidation();
});

Promise.all([api.getInitialCards(), api.getUserMe()]).then(
  ([dataCard, dataUser]) => {
    // Установка информации и пользователе с сервера
    userInfo.setUserInfo(dataUser);

    // Добавление id пользователя в каждую карточку
    dataCard.forEach(element => {
      element._userId = dataUser._id;
    });

    // Рендер карточек с сервера с добавленным id пользователя
    cardList.renderItems(dataCard);
  }
).catch(error => {
  console.error(error);
});
