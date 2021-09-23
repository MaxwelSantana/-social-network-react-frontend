import { useCallback } from 'react';
import { useAuth, useClient } from '../context/auth-context';
import { useAsync } from './hooks';

function useCreatePost() {
    const { user } = useAuth();
    const currentUserId = user?._id;
    const client = useClient();
    const { run, ...rest } = useAsync();

    const callApi = useCallback(
        (post) => {
            return run(
                client(`post/new/${currentUserId}`, {
                    method: 'POST',
                    body: post,
                }),
            );
        },
        [client, currentUserId, run],
    );
    return [callApi, { ...rest }];
}

export { useCreatePost };
