// Попапы
const popupElement = document.querySelector('.popup');

const popupEditEl = document.querySelector('.popup_var_edit');
const popupAddEl = document.querySelector('.popup_var_add');
const popupPictureEl = document.querySelector('.popup_var_pictures');

// Массив со всеми попапами
const popupList = Array.from(document.querySelectorAll('.popup'));

// Кнопки открытия попапов
const popupEditOpenButtonEl = document.querySelector('.profile__edit-button');
const popupAddOpenButtonEl = document.querySelector('.profile__add-button');

// Массив со всеми кнопками закрытия попапов
const closeButtonsList = Array.from(document.querySelectorAll('.popup__close-button'));

// Inputs
const inputsList = document.querySelectorAll('.popup__field');
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

// Submit-кнопки попапов
const popupAddButtonEl = document.querySelector('.popup_submit-button_var_add')
const popupEditButtonEl = document.querySelector('.popup_submit-button_var_edit')

// Контейнер попапа с изображением
const popupPicContainer = document.querySelector('.popup__container_var_pictures');
const popupImageEl = popupPicContainer.querySelector('.popup__image');
const popupSubscribeEl = popupPicContainer.querySelector('.popup__subscribe');

// Карточки
const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.cards__template').content;

// Массив объектов предустановленных карточек
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
