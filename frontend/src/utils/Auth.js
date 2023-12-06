export const BASE_URL = 'https://api.ichemakina.nomoredomainsmonster.ru';

function checkResponse(result) {
    if (result.ok) {
        return result.json();
    }

    return Promise.reject(`Ошибка: ${result.status}`);
}

export function register(email, password) {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(checkResponse)
        .then(res => res.data);
};

export function authorize(email, password) {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(checkResponse)
        .then((res) => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                return res;
            }
        })
};

export function checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then(checkResponse)
        .then(res => res)
}