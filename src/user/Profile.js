import React, { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import DefaultProfile from '../images/avatar.jpg';
import { useProfile } from '../utils/profiles';
import { DeleteUser } from './DeleteUser';
import { FollowProfileButton } from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';

export default function Profile() {
    const { user: authUser } = useAuth();
    const { userId } = useParams();
    const [refetch, { data: user, error, isLoading }] = useProfile(userId);
    const { name, email } = user;
    useErrorHandler(error);

    const photoUrl = user._id
        ? `${process.env.REACT_APP_API_URL}/user/photo/${user._id}`
        : DefaultProfile;

    const isAuthenticatedUser = authUser._id === userId;

    const renderActions = () => {
        if (isAuthenticatedUser) {
            return (
                <>
                    <Link
                        to={`/user/edit/${user?._id}`}
                        className="btn btn-primary me-2"
                    >
                        Edit Profile
                    </Link>
                    <DeleteUser userId={user?._id} />
                </>
            );
        } else {
            return <FollowProfileButton user={user} onChange={refetch} />;
        }
    };

    const renderTabs = () => (
        <div className="row mt-5">
            <ProfileTabs
                followers={user.followers}
                following={user.following}
            />
        </div>
    );

    if (isLoading)
        return (
            <Spinner
                show={true}
                style={{ position: 'fixed', inset: 0, margin: 'auto' }}
            />
        );

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">{name}</h2>
            <div className="row">
                <div className="col-md-4">
                    <img
                        style={{ height: '200px', width: 'auto' }}
                        className="img-thumbnail"
                        src={photoUrl}
                        alt={name}
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                    />
                </div>
                <div className="col-md-4">
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>
                        {user.loadingUser
                            ? null
                            : `Created at ${new Date(
                                  user?.created,
                              ).toDateString()}`}
                    </p>
                    {!user.loadingUser ? renderActions() : null}
                </div>
            </div>
            {!user.loadingUser ? renderTabs() : null}
        </div>
    );
}
