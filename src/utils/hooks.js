import React from 'react';

const defaultInitialState = { status: 'idle', data: null, error: null };
function useAsync(initialState) {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState,
    });
    const [{ status, data, error }, setState] = React.useReducer(
        (s, a) => ({ ...s, ...a }),
        initialStateRef.current,
    );

    const setData = React.useCallback(
        (data) => setState({ data, status: 'resolved' }),
        [setState],
    );
    const setError = React.useCallback(
        (error) => setState({ error, status: 'rejected' }),
        [setState],
    );
    const reset = React.useCallback(
        () => setState(initialStateRef.current),
        [setState],
    );

    const run = React.useCallback(
        (promise) => {
            if (!promise || !promise.then) {
                throw new Error(
                    `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
                );
            }
            setState({ status: 'pending' });
            return promise.then(
                (data) => {
                    setData(data);
                    return data;
                },
                (error) => {
                    setError(error);
                    return Promise.reject(error);
                },
            );
        },
        [setState, setData, setError],
    );

    return {
        // using the same names that react-query uses for convenience
        isIdle: status === 'idle',
        isLoading: status === 'pending',
        isError: status === 'rejected',
        isSuccess: status === 'resolved',

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    };
}

export { useAsync };
