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

    getUserInfo() {
        return this._request(`${this._url}/users/me`, {
            headers: this._headers
        });
    }

    getInitialCards() {
        return this._request(`${this._url}/cards`, {
            headers: this._headers
        });
    }

    updateUserInfo(data) {
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
        return this._request(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    likeCard(cardId) {
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        });
    }

    deleteLikeCard(cardId) {
        return this._request(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return this.likeCard(cardId);
        }
        else {
            return this.deleteLikeCard(cardId);
        }
    }

    updateUserAvatar(avatarLink) {
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