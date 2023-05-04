class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._image = data.image;
    this._title = data.title;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._card.querySelector('.cards__image');
    this._likeButton = this._card.querySelector('.cards__like-button');

    this._setEventListeners(); // Вызов слушателя событий

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._card.querySelector('.cards__title').textContent = this._title;

    return this._card;
  }

  // Функционал "лайка"
  _toggleLike() {
    this._likeButton.classList.toggle('cards__like-button_active');
  }

  // Удаление карточки по клику на "мусорку"
  _removeCard() {
    this._card.remove()
  }

  // Обработчик закрытия попапа универсальный => в index.js

  // Слушатель клика по карточке
  _setEventListeners() {
    this._likeButton
      .addEventListener('click', () => {
        this._toggleLike()
      });

    this._card
      .querySelector('.cards__reset-button')
      .addEventListener('click', () => {
        this._removeCard()
      });

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardClick(this._image, this._title)
      });
  }
};

export { Card }
