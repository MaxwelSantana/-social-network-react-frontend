import { client } from '../utils/api-client';

const localStorageKey = 'token';

async function getToken() {
    return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(response) {
    window.localStorage.setItem(localStorageKey, response.token);
    return response;
}

function login({ email, password }) {
    return client('signin', { data: { email, password } }).then(
        handleUserResponse,
    );
}

function register({ name, email, password }) {
    return client('signup', { data: { name, email, password } }).then(
        handleUserResponse,
    );
}

async function logout() {
    window.localStorage.removeItem(localStorageKey);
}

export { getToken, handleUserResponse, login, register, logout };
