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

function usePost(postId) {
    const { run, data: post, ...rest } = useAsync();

    useEffect(() => {
        run(client(`post/${postId}`));
    }, [run, postId]);

    return { post, ...rest };
}

function usePostsByUser(userId) {
    const client = useClient();
    const { run, data: posts, ...rest } = useAsync({ data: [] });

    useEffect(() => {
        run(client(`posts/by/${userId}`));
    }, [client, run, userId]);

    return { posts, ...rest };
}

function useDeletePost(postId) {
    const client = useClient();
    const { run, ...rest } = useAsync();

    const callApi = useCallback(
        () => run(client(`post/${postId}`, { method: 'DELETE' })),
        [client, postId, run],
    );

    return [callApi, rest];
}

function useUpdatePost(postId) {
    const client = useClient();
    const { run, ...rest } = useAsync();

    const callApi = useCallback(
        (updates) =>
            run(client(`post/${postId}`, { method: 'PUT', body: updates })),
        [client, postId, run],
    );

    return [callApi, rest];
}

function useLikePost(postId) {
    const client = useClient();
    const { run, ...rest } = useAsync();

    const callApi = useCallback(
        (userId) =>
            run(
                client(`post/like`, {
                    method: 'PUT',
                    data: { postId, userId },
                }),
            ),
        [client, postId, run],
    );

    return [callApi, rest];
}
function useUnLikePost(postId) {
    const client = useClient();
    const { run, ...rest } = useAsync();

    const callApi = useCallback(
        (userId) =>
            run(
                client(`post/unlike`, {
                    method: 'PUT',
                    data: { postId, userId },
                }),
            ),
        [client, postId, run],
    );

    return [callApi, rest];
}

export {
    useCreatePost,
    usePosts,
    usePost,
    usePostsByUser,
    useDeletePost,
    useUpdatePost,
    useLikePost,
    useUnLikePost,
};
