import { client } from '../utils/api-client';

const localStorageKey = 'token';

function getToken() {
    return window.localStorage.getItem(localStorageKey);
}

function isAuthenticated() {
    return Boolean(getToken());
}

function handleUserResponse(response) {
    window.localStorage.setItem(localStorageKey, response.token);
    return response;
}

function signin({ email, password }) {
    return client('signin', { data: { email, password } }).then(
        handleUserResponse,
    );
}

function signup({ name, email, password }) {
    return client('signup', { data: { name, email, password } }).then(
        handleUserResponse,
    );
}

async function signout() {
    window.localStorage.removeItem(localStorageKey);
}

export {
    getToken,
    isAuthenticated,
    handleUserResponse,
    signin,
    signup,
    signout,
};
