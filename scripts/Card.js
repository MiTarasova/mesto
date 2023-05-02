import { openPopup } from "./index.js"
import { popupPictureEl, popupImageEl, popupSubscribeEl } from "./constants.js"

class Card {
  constructor(data, templateSelector) {
    this._image = data.image;
    this._title = data.title;
    this._templateSelector = templateSelector;
  }

  // Клонирование темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  // Создание карточки
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners(); // Вызов слушателя событий

    this._card.querySelector('.cards__image').src = this._image;
    this._card.querySelector('.cards__image').alt = this._title;
    this._card.querySelector('.cards__title').textContent = this._title;

    return this._card;
  }

  // Функционал "лайка"
  _like() {
    this._card
      .querySelector('.cards__like-button')
      .classList.toggle('cards__like-button_active');
  }

  // Удаление карточки по клику на "мусорку"
  _removeCard() {
    this._card.remove()
  }

  // Обработчик открытия попапа
  _handleOpenPopup() {
    popupImageEl.src = this._image;
    popupImageEl.alt = this._title;
    popupSubscribeEl.textContent = this._title;

    openPopup(popupPictureEl)
  }

  // Обработчик закрытия попапа универсальный => в index.js

  // Слушатель клика по карточке
  _setEventListeners() {
    this._card
      .querySelector('.cards__like-button')
      .addEventListener('click', () => {
        this._like()
      });

    this._card
      .querySelector('.cards__reset-button')
      .addEventListener('click', () => {
        this._removeCard()
      });

    this._card
      .querySelector('.cards__image')
      .addEventListener('click', () => {
        this._handleOpenPopup()
      })
  }
};

export { Card }
