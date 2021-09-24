import React from 'react';
import { useAuth, useClient } from '../context/auth-context';
import { useAsync } from '../utils/hooks';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';

function DeleteUser({ userId }) {
    const { signout } = useAuth();
    const client = useClient();
    const { isLoading, isError, error, run } = useAsync();

    const handleDeleteConfirmation = () => {
        if (window.confirm('Are you sure you want to delete your profile?'))
            handleDeleteUser();
    };

    const handleDeleteUser = () => {
        const endpoint = `user/${userId}`;
        run(client(endpoint, { method: 'DELETE' })).then(() => {
            signout();
        });
    };

    return (
        <>
            <button
                onClick={handleDeleteConfirmation}
                type="button"
                className="btn btn-danger"
                disabled={isLoading}
            >
                {isLoading ? <Spinner show={true} /> : 'Delete Profile'}
            </button>
            <ErrorMessage className="mt-2" show={isError}>
                {error}
            </ErrorMessage>
        </>
    );
}

export { DeleteUser };
