import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../utils/hooks';
import { useFollow, useUnFollow } from '../utils/profiles';

function FollowProfileButton({ user, onChange }) {
    const { user: currentUser } = useAuth();
    const { isLoading, isError, reset, run } = useAsync();
    const [follow] = useFollow();
    const [unFollow] = useUnFollow();

    const handleOnChange = (updateFollowUnFollowApiCall) => {
        reset();
        run(updateFollowUnFollowApiCall(user._id)).then(() => {
            if (onChange) run(onChange());
        });
    };

    if (!currentUser || !user) return <></>;

    const isFollowing =
        user.followers &&
        user.followers.some((follower) => follower._id === currentUser._id);

    return (
        <div className="d-inline-block">
            <ErrorMessage show={isError}>Something wrong happened</ErrorMessage>
            {!isFollowing ? (
                <button
                    onClick={() => handleOnChange(follow)}
                    disabled={isLoading}
                    className="btn btn-success btn-raised mr-5"
                >
                    {isLoading ? <Spinner show={true} /> : 'Follow'}
                </button>
            ) : (
                <button
                    onClick={() => handleOnChange(unFollow)}
                    disabled={isLoading}
                    className="btn btn-warning btn-raised"
                >
                    {isLoading ? <Spinner show={true} /> : 'UnFollow'}
                </button>
            )}
        </div>
    );
}

export { FollowProfileButton };
