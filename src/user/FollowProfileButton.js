import React from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../utils/hooks';
import { useFollow } from '../utils/profiles';

function FollowProfileButton({ user }) {
    const { isLoading, isError, error, run, reset } = useAsync();
    const { user: currentUser } = useAuth();

    const [follow] = useFollow();

    const followClick = () => {
        reset();
        run(follow(user._id));
    };

    const unfollowClick = () => {
        // onButtonClick(unfollow);
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
                    onClick={followClick}
                    disabled={isLoading}
                    className="btn btn-success btn-raised mr-5"
                >
                    {isLoading ? <Spinner show={true} /> : 'Follow'}
                </button>
            ) : (
                <button
                    onClick={unfollowClick}
                    className="btn btn-warning btn-raised"
                >
                    UnFollow
                </button>
            )}
        </div>
    );
}

export { FollowProfileButton };
