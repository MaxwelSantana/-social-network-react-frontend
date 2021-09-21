import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import * as authService from '../services/auth-service';
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
    const { data, isError, error, isLoading, setData, setError, run, reset } =
        useAsync();
    const user = data?.user;
    const token = data?.token;

    useEffect(() => {
        const userData = authService.getUser();
        if (userData) {
            const userObj = JSON.parse(userData);
            setData(userObj);
        }
    }, [setData]);

    const signin = useCallback(
        (credentials, cbk) =>
            run(authService.signin(credentials)).then(() => {
                if (cbk) cbk();
            }),
        [run],
    );
    const signup = useCallback(
        (credentials) => run(authService.signup(credentials)),
        [run],
    );
    const signout = useCallback(() => {
        authService.signout();
        setData(null);
    }, [setData]);

    return {
        user,
        token,
        signin,
        signup,
        signout,
        isLoading,
        isError,
        error,
        reset,
    };
};

const useClient = () => {
    const { token } = useAuth();
    return useCallback(
        (endpoint, config) => client(endpoint, { ...config, token }),
        [token],
    );
};

export { AuthProvider, useAuth, useClient };
