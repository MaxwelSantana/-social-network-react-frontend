import React from 'react';
import { Spinner } from '../components/Spinner';
import { useFollow } from '../utils/profiles';

function FollowProfileButton({ following, onButtonClick }) {
    const [callApi, { isLoading }] = useFollow();

    const followClick = () => {
        onButtonClick(callApi);
    };

    const unfollowClick = () => {
        // onButtonClick(unfollow);
    };
    return (
        <div className="d-inline-block">
            {!following ? (
                <button
                    onClick={followClick}
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

export default FollowProfileButton;
