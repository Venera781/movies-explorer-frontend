class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getData(path, addCookies = false) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: 'GET',
      headers: this._headers,
      credentials: addCookies ? 'include' : 'omit',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
  _sendData(path, method, addCookies, body) {
    return fetch(`${this._baseUrl}/${path}`, {
      method: method,
      headers: this._headers,
      credentials: addCookies ? 'include' : 'omit',
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

export default Api;
