export default class UserInfo {
  constructor({ userName, userAbout, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userAbout);
    this._userAvatar = document.querySelector(userAvatar);
  }

  // Метод, возвращающий объект для подставления информации
  // о пользователе в форму попапа при открытии
  getUserInfo() {
    return {
      name: this._userName.innerText,
      about: this._userAbout.innerText,
    };
  }

  // Метод, подставляющий новые данные на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
