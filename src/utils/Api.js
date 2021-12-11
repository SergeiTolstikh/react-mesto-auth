class Api {
    constructor({ baseUrl, groupId, token }) {
        this._address = `${baseUrl}/${groupId}`;
        this._token = token;
    }

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse);
    }

    postNewCard(data) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this._address}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(this._checkResponse);
    }

    putCardLike(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
            },
        })
            .then(this._checkResponse);
    }

    deleteCardLike(cardId) {
        return fetch(`${this._address}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
            },
        })
            .then(this._checkResponse);
    }


    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.nameProfile,
                about: data.aboutProfile,
            })
        })
            .then(this._checkResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}: ${res.message}`);
    }

    getPageInfo() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
      }

}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1',
    groupId: 'cohort-28',
    token: '7ab77057-a030-4fc1-abd5-bdd9c6f29070',
  });

export default api