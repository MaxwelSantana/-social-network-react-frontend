import { useCallback } from 'react';
import { useClient } from '../context/auth-context';
import { useAsync } from './hooks';

function useFollow() {
    const client = useClient();

    const { run, ...rest } = useAsync();
    const callApi = useCallback(
        ({ userId, followId }) => {
            return run(
                client('user/follow', {
                    data: { userId, followId },
                    method: 'PUT',
                }),
            );
        },
        [client, run],
    );
    return [callApi, { ...rest }];
}

export { useFollow };
