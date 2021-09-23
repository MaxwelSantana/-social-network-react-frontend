import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth-context';
import DefaultProfile from '../images/avatar.jpg';
import { useProfile } from '../utils/profiles';
import { DeleteUser } from './DeleteUser';
import { FollowProfileButton } from './FollowProfileButton';

export default function Profile() {
    const { user: authUser } = useAuth();
    const { userId } = useParams();
    const user = useProfile(userId);

    const { name, email } = user;

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
            return <FollowProfileButton user={user} />;
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            <img
                style={{ height: '200px', width: 'auto' }}
                className="img-thumbnail"
                src={photoUrl}
                alt={name}
                onError={(i) => (i.target.src = `${DefaultProfile}`)}
            />
            <p>{name}</p>
            <p>{email}</p>
            <p>
                {user.loadingUser
                    ? null
                    : `Created at ${new Date(user?.created).toDateString()}`}
            </p>
            {!user.loadingUser ? renderActions() : null}
        </div>
    );
}
