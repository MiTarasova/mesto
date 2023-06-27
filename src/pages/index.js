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

// Массив карточек с сервера
const uploadedCards = await api
  .getInitialCards()
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.error(err);
  });

// Массив информации о пользователе с сервера
const uploadedUserInfo = await api
  .getUserMe()
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.error(err);
  });

// создание карточки и отправка ее данных на сервер
const handleSubmit = (data) => {
  api
    .createNewCard(data)
    .then((res) => {
      renderCard(res);
      popupAddObj.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddObj.setDefaultButton();
    });
};

// Создание новой секции для карточек
const cardList = new Section(
  {
    items: uploadedCards,
    renderer: renderCard,
  },
  ".cards"
);

cardList.renderItems();

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
        popupImageObj.open(link, name);
      },
      handleCardDelete: (card, id) => {
        popupDeleteObj.open(card, id);
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
      userId: uploadedUserInfo._id,
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

// Установка информации и пользователе с сервера
userInfo.setUserInfo(uploadedUserInfo);

// Экземпляр класса попапа с формой для "Редактирование профиля"
const popupEditObj = new PopupWithForm(".popup_var_edit", (item) => {
  api
    .newUserInfo(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupEditObj.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupEditObj.setDefaultButton();
    });
  // Подстановка новых значений инпутов
});

// Экземпляр класса попапа с формой для "Новое место"
const popupAddObj = new PopupWithForm(".popup_var_add", () => {
  handleSubmit({ link: placeLinkInput.value, name: nameInput.value });
});

// Экземпляр класса попапа с формой для "Обновить аватар"
const popupAvatarObj = new PopupWithForm(".popup_var_upd-avatar", (item) => {
  api
    .newUserAvatar(item)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupAvatarObj.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAvatarObj.setDefaultButton();
    });
});

const popupImageObj = new PopupWithImage(".popup_var_pictures");

const popupDeleteObj = new PopupWithConfirmation(
  ".popup_var_confirm",
  (card, id) => {
    api
      .deleteCard(id)
      .then(() => {
        card.removeCard();
      })
      .catch((err) => {
        console.error(err);
      });
    popupDeleteObj.close();
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
  popupEditObj.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formEditValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  // Подстановка значений из профиля
  popupEditObj.setInputValues(userData);
});

// Открытие попапа "Добавление фото" по клику на add
popupAddOpenButtonEl.addEventListener("click", () => {
  popupAddObj.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAddValidator.resetValidation();
});

// Открытие попапа "Обновить аватар" по клику на аву
popupAvatarOpenButtonEl.addEventListener("click", () => {
  popupAvatarObj.open();
  // Сброс кнопки и ошибок инпутов при открытии попапа
  formAvatarValidator.resetValidation();
});
