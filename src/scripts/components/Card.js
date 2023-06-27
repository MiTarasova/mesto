export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleCardLike, userId },
    templateSelector
  ) {
    this._link = data.link;
    this._name = data.name;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._userId = userId;
  }

  // Клонирование темплейта
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".cards__item")
      .cloneNode(true);
    return cardElement;
  }

  // Создание карточки
  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".cards__image");
    this._likeButton = this._card.querySelector(".like__button");
    this._deleteButton = this._card.querySelector(".cards__reset-button");
    this._counter = this._card.querySelector(".like__counter");

    this._setEventListeners(); // Вызов слушателя событий

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.querySelector(".cards__title").textContent = this._name;

    this._removeTrash();

    this._checkLike();
    this._setLikesCounter(this._likes);

    return this._card;
  }

  // Функционал "лайка"
  setLike(likes) {
    this._likeButton.classList.add("like__button_active");
    this._setLikesCounter(likes);
  }

  removeLike(likes) {
    this._likeButton.classList.remove("like__button_active");
    this._setLikesCounter(likes);
  }

  isLike() {
    const isLikeByMe = this._likes.find((element) => {
      return element._id === this._userId;
    });
    return isLikeByMe;
  }

  _checkLike() {
    const isLike = this.isLike();
    if (isLike) {
      this._likeButton.classList.add("like__button_active");
    }
  }

  _setLikesCounter(likes) {
    this._counter.textContent = likes.length;
  }

  _removeTrash() {
    if (this._owner._id !== this._userId) {
      this._card.querySelector(".cards__reset-button").remove();
    }
  }

  // Удаление карточки по клику на "мусорку"
  removeCard() {
    this._card.remove();
  }

  // Обработчик закрытия попапа универсальный => в index.js

  // Слушатель клика по карточке
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this._id);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this, this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name);
    });
  }
}
