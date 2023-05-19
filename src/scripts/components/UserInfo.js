export default class UserInfo {
  constructor({ userName, userAbout }) {
    this._userName = userName;
    this._userAbout = userAbout;
  }

  // Метод, возвращающий объект для подставления информации
  // о пользователе в форму попапа при открытии
  getUserInfo() {
    const userInfoData = {
      name: this._userName.innerText,
      about: this._userAbout.innerText,
    };
    return userInfoData;
  }

  // Метод, подставляющий новые данные на страницу
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
  }
}
