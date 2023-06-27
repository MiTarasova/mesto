import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._submitButton = this._popup.querySelector(".popup__submit-button");
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      this._submitFunction(this._element, this._elementId);
    });
  }

  open = (element, elementId) => {
    super.open();
    this._element = element;
    this._elementId = elementId;
  };
}
