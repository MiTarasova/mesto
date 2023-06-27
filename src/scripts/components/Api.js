class Api {
  constructor(data) {
    this._baseURL = data.baseUrl;
    this._headers = data.headers;
    this._authorization = data.headers.authorization;
  }

  _result(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // получение карточек с сервера в виде массива
  getInitialCards() {
    return fetch(this._baseURL + "/cards", {
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  }

  // добавление новой карточки на сервер
  createNewCard(data) {
    return fetch(this._baseURL + "/cards", {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  }

  // удаление карточки с сервера
  deleteCard = (id) => {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-69/cards/" + id, {
      headers: {
        authorization: "5b16b2c2-99fd-48b9-8c43-10ad543e77bf",
      },
      method: "DELETE",
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  };

  // получение данных пользователя с сервера
  getUserMe() {
    return fetch(this._baseURL + "/users/me", {
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  }

  // сохранение данных профиля на сервере
  newUserInfo(data) {
    return fetch(this._baseURL + "/users/me", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  }

  // сохранение аватара на сервере
  newUserAvatar(data) {
    return fetch(this._baseURL + "/users/me/avatar", {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  }

  // лайк
  likeCard = (id) => {
    return fetch(this._baseURL + "/cards/" + id + "/likes", {
      headers: {
        authorization: this._authorization,
      },
      method: "PUT",
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  };

  // удаление лайка
  deleteLike = (id) => {
    return fetch(this._baseURL + "/cards/" + id + "/likes", {
      headers: {
        authorization: this._authorization,
      },
      method: "DELETE",
    })
      .then(this._result)
      .catch((err) => {
        console.log(err);
      });
  };
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
  headers: {
    authorization: "5b16b2c2-99fd-48b9-8c43-10ad543e77bf",
    "Content-Type": "application/json",
  },
});
