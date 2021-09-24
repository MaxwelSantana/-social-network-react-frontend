import { useCallback, useEffect } from 'react';
import { useAuth, useClient } from '../context/auth-context';
import { useAsync } from './hooks';
import { client } from './api-client';

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

function usePosts() {
    const { run, data: posts, ...rest } = useAsync({ data: [] });

    useEffect(() => {
        run(client('posts'));
    }, [run]);

    return { posts, ...rest };
}

export { useCreatePost, usePosts };
