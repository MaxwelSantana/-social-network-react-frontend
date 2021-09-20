import React, { createContext, useCallback, useContext, useState } from 'react';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';

const authContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const {
        data: user,
        status,
        error,
        isLoading,
        isIdle,
        isError,
        isSuccess,
        run,
        setData,
    } = useAsync();

    const login = useCallback((credentials) =>
        run(client('signin', { data: credentials })),
    );

    console.log('user', user);

    return { user, login };
};

export { AuthProvider, useAuth };
