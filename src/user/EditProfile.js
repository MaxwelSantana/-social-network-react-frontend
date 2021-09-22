import React, { useEffect, useRef, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { ErrorMessage } from '../components/ErrorMessage';
import { Spinner } from '../components/Spinner';
import { useClient } from '../context/auth-context';
import { useAsync } from '../utils/hooks';
import DefaultProfile from '../images/avatar.jpg';

const validations = {
    name: function (value) {
        const hasError = !value || value.length === 0;
        if (hasError) return { hasError, message: 'Name is required' };

        return { hasError };
    },
    email: function (value) {
        const hasError = !value || value.length === 0;
        if (hasError) return { hasError, message: 'Email is required' };

        return { hasError };
    },
    password: function (value) {
        const hasError = value && !value.match(/.*[0-9].*/);
        if (hasError)
            return {
                hasError,
                message: 'Password must contain at least one number',
            };
        return { hasError };
    },
};

function EditProfile() {
    const [{ name, email, password, fileSize }, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
        fileSize: 0,
    });
    const [updated, setUpdated] = useState(false);
    const [error, setError] = useState('');
    const { userId } = useParams();
    const { isLoading, run } = useAsync();
    const client = useClient();
    const userDataRef = useRef(new FormData());
    const photoUrl = userId
        ? `${process.env.REACT_APP_API_URL}/user/photo/${userId}`
        : DefaultProfile;

    useEffect(() => {
        if (!userId) return;
        const endpoint = `user/${userId}`;
        run(client(endpoint)).then((user) => {
            const { name, email } = user;
            setFormFields({ name, email, password: '', fileSize: 0 });
        });
    }, [userId, run, client, setFormFields]);

    const handleChange = (name) => (event) => {
        setError('');
        const value =
            name === 'photo' ? event.target.files[0] : event.target.value;
        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        setFormFields((prev) => ({ ...prev, [name]: value, fileSize }));
        userDataRef.current.set(name, value);
    };

    const isValid = () => {
        if (fileSize > 1000000) {
            setError('File size should be less than 100kb');
            return false;
        }
        if (name.length === 0) {
            setError('Name is required');
            return false;
        }
        // email@domain.com
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError('A valid Email is required');
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isValid()) return;

        const endpoint = `user/${userId}`;
        run(
            client(endpoint, {
                method: 'PUT',
                body: userDataRef.current,
            }),
        ).then((user) => {
            setUpdated(true);
        });
    };

    if (updated) return <Redirect to={`/user/${userId}`} />;

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Edit Profile</h2>
            <ErrorMessage show={!!error}>{error}</ErrorMessage>
            <Spinner show={isLoading} />
            <img
                style={{ height: '200px', width: 'auto' }}
                className="img-thumbnail"
                src={photoUrl}
                alt={name}
            />
            <form
                onSubmit={handleSubmit}
                className={`row g-1 needs-validation was-validated`}
                noValidate
            >
                <div className="form-group">
                    <label className="text-muted">Profile Photo</label>
                    <input
                        onChange={handleChange('photo')}
                        type="file"
                        accept="image/*"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        onChange={handleChange('name')}
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="text-muted">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        onChange={handleChange('email')}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-muted">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        onChange={handleChange('password')}
                        value={password}
                    />
                </div>
                <div className="col-12">
                    <button className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
