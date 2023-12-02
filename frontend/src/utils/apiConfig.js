const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-74';
const authorizationToken = '5a3741e0-975a-4b13-97d5-06d60968eca5';

export const apiConfig = {
  baseUrl: baseUrl,
  headers: {
    authorization: authorizationToken,
    'Content-Type': 'application/json'
  }
};