import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupSubscribe = this._popup.querySelector(".popup__subscribe");
  }

  open(image, title) {
    this._popupImage.src = image;
    this._popupImage.alt = title;
    this._popupSubscribe.textContent = title;
    super.open();
  }
}
