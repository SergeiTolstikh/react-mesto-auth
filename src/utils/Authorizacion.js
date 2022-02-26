class Authorizacion {

    constructor(config) {
      this._baseUrl = config.url;
      this._headers = config.headers;
    }
  
    _checkRes(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    register(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
        .then((res) => this._checkRes(res));
    }
  
    login(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
        .then((res) => this._checkRes(res));
    }
  
    checkToken(jwt) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        method: 'GET',
      })
        .then((res) => this._checkRes(res));
    }
  }
  
  const auth = new Authorizacion({
    url: 'https://auth.nomoreparties.co',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default auth