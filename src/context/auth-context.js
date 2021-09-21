import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import * as authService from '../services/auth-service';
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
    const { data, error, isLoading, setData, run } = useAsync();
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
        (credentials) => run(authService.signin(credentials)),
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

    console.log('user&token', { user, token });

    return { user, token, signin, signup, signout, isLoading, error };
};

export { AuthProvider, useAuth };
