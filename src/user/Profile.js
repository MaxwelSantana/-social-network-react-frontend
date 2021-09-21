import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useAuth, useClient } from '../context/auth-context';
import { useAsync } from '../utils/hooks';
import { DeleteUser } from './DeleteUser';

export default function Profile() {
    const { user: authUser } = useAuth();
    const { userId } = useParams();
    const { data: user, isError, isLoading, error, run } = useAsync();
    const client = useClient();

    useEffect(() => {
        if (!userId) return;
        const endpoint = `user/${userId}`;
        run(client(endpoint));
    }, [userId, run, client]);

    const isAuthenticatedUser = () => authUser._id === userId;

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>
            <div
                className="alert alert-danger"
                style={{ display: isError ? '' : 'none' }}
            >
                {error}
            </div>
            <Spinner show={isLoading} />
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{`Created at ${new Date(user?.created).toDateString()}`}</p>
            {isAuthenticatedUser() && (
                <>
                    <Link
                        to={`/user/edit/${user?._id}`}
                        className="btn btn-primary me-2"
                    >
                        Edit Profile
                    </Link>
                    <DeleteUser userId={user?._id} />
                </>
            )}
        </div>
    );
}
