import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';

export default function Users() {
    const {
        data: users,
        isLoading,
        isError,
        error,
        run,
    } = useAsync({ data: [] });

    useEffect(() => {
        run(client('users'));
    }, [run]);

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Users</h2>
            {isLoading && <Spinner />}
            <ErrorMessage show={isError}>{error}</ErrorMessage>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <th scope="row">{user._id}</th>
                            <td>
                                <Link to={`user/${user._id}`}>{user.name}</Link>
                            </td>
                            <td>{user.email}</td>
                            <td>{new Date(user.created).toDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
