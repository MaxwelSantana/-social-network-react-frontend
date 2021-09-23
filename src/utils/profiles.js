import { useCallback, useEffect } from 'react';
import { useClient } from '../context/auth-context';
import { useAsync } from './hooks';

const loadingUser = {
    name: 'Loading...',
    email: 'Loading...',
    loadingUser: true,
};

function useProfile(userId) {
    const client = useClient();
    const { data, run } = useAsync();

    useEffect(() => {
        run(client(`user/${userId}`));
    }, [run, client, userId]);

    return data ?? loadingUser;
}

function useFollow() {
    const client = useClient();

    const { run, ...rest } = useAsync();
    const callApi = useCallback(
        (followId) => {
            return run(
                client('user/follow', {
                    data: { followId },
                    method: 'PUT',
                }),
            );
        },
        [client, run],
    );
    return [callApi, { ...rest }];
}

export { useProfile, useFollow };
