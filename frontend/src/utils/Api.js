import { apiConfig } from './apiConfig';

class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json();
        }

        return Promise.reject(`Ошибка: ${result.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    setToken(token) {
        this._headers['authorization'] = `Bearer ${token}`;
    }

    getUserInfo() {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/users/me`, {
            headers: this._headers
        });
    }

    getInitialCards() {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/cards`, {
            headers: this._headers
        });
    }

    updateUserInfo(data) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    addNewCard(data) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        });
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    likeCard(cardId) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
    }

    deleteLikeCard(cardId) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        if (!isLiked) {
            return this.likeCard(cardId);
        }
        else {
            return this.deleteLikeCard(cardId);
        }
    }

    updateUserAvatar(avatarLink) {
        const token = localStorage.getItem('token');
        api.setToken(token);
        return this._request(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        });
    }
}

export const api = new Api(apiConfig);