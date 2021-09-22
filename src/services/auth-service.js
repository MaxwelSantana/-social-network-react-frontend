import { client } from '../utils/api-client';

const localStorageKey = 'user';

function getUser() {
    return window.localStorage.getItem(localStorageKey);
}

function isAuthenticated() {
    return Boolean(getUser());
}

function handleUserResponse(user) {
    window.localStorage.setItem(localStorageKey, JSON.stringify(user));
    return user;
}

function signin({ email, password }) {
    return client('signin', { data: { email, password } }).then(
        handleUserResponse,
    );
}

function signup({ name, email, password }) {
    return client('signup', { data: { name, email, password } });
}

async function signout() {
    window.localStorage.removeItem(localStorageKey);
}

function update(user) {
    const userData = getUser();
    if (userData) {
        const userObj = JSON.parse(userData);
        const updatedUser = { ...userObj, user };
        console.log({ updatedUser });
        window.localStorage.setItem(
            localStorageKey,
            JSON.stringify(updatedUser),
        );
    }
}

export {
    getUser,
    isAuthenticated,
    handleUserResponse,
    signin,
    signup,
    signout,
    update,
};
