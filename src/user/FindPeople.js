import React from 'react';
import { useFindPeople } from '../utils/profiles';
import DefaultProfile from '../images/avatar.jpg';
import { Link } from 'react-router-dom';
import { FollowProfileButton } from './FollowProfileButton';
import { Spinner } from '../components/Spinner';

function FindPeople() {
    const [refetch, { data: users, isLoading }] = useFindPeople();

    const renderUsers = () => {
        if (!users) return;
        if (!users.length) return <p>Not found data</p>;
        return users.map((user) => (
            <li
                className="list-group-item d-flex align-items-center justify-content-between"
                key={user._id}
            >
                <div className="d-flex align-items-center">
                    <img
                        style={{
                            height: '35px',
                            width: 'auto',
                            borderRadius: '50%',
                            marginRight: '5px',
                        }}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={(i) => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <Link to={`/user/${user._id}`}>{user.name}</Link>
                </div>
                <FollowProfileButton user={user} onChange={refetch} />
            </li>
        ));
    };

    if (isLoading)
        return (
            <Spinner
                show={true}
                style={{ position: 'fixed', inset: 0, margin: 'auto' }}
            />
        );

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Find People</h2>
            <ul className="list-group col-md-4">{renderUsers()}</ul>
        </div>
    );
}

export default FindPeople;
