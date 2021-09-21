import React, { createContext, useCallback, useContext, useState } from 'react';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';
import * as authService from '../services/auth-service';

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const { data, status, error, isLoading, run } = useAsync();
    const user = data?.user;
    const token = data?.token;

    const login = useCallback(
        (credentials) => run(authService.login(credentials)),
        [run],
    );

    console.log('user&token', { user, token });

    return { user, token, login, isLoading, error };
};

export { AuthProvider, useAuth };
