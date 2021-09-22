import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Spinner } from '../components/Spinner';
import { useClient } from '../context/auth-context';
import { useAsync } from '../utils/hooks';

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
    const [{ name, email, password }, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [updated, setUpdated] = useState(false);
    const [errors, setErrors] = useState({});
    const { userId } = useParams();
    const { isLoading, run } = useAsync();
    const client = useClient();

    useEffect(() => {
        if (!userId) return;
        const endpoint = `user/${userId}`;
        run(client(endpoint)).then((user) => {
            const { name, email, password } = user;
            setFormFields({ name, email, password });
        });
    }, [userId, run, client, setFormFields]);

    const handleChange = (name) => (event) => {
        const { value } = event.target;
        setFormFields((prev) => ({ ...prev, [name]: value }));
        handleFieldValidation(name, value);
    };

    const handleFieldValidation = (field, value) => {
        const validationFn = validations[field];
        const { hasError, message } = validationFn(value);
        setErrors((prev) => ({ ...prev, [field]: hasError && { message } }));
        return hasError;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (handleFieldValidation('name', name)) return;
        if (handleFieldValidation('email', email)) return;
        if (handleFieldValidation('password', password)) return;

        const endpoint = `user/${userId}`;
        run(
            client(endpoint, {
                method: 'PUT',
                data: { name, email, password },
            }),
        ).then((user) => {
            setUpdated(true);
        });
    };

    if (updated) return <Redirect to={`/user/${userId}`} />;

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Edit Profile</h2>
            <Spinner show={isLoading} />
            <form
                onSubmit={handleSubmit}
                className={`row g-1 needs-validation was-validated`}
                noValidate
            >
                <div className="form-group">
                    <label htmlFor="name" className="text-muted">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className={`form-control ${
                            errors.name && 'is-invalid'
                        }`}
                        onChange={handleChange('name')}
                        value={name}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="text-muted">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={`form-control ${
                            errors.email && 'is-invalid'
                        }`}
                        onChange={handleChange('email')}
                        required
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="text-muted">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={`form-control ${
                            errors.password && 'is-invalid'
                        }`}
                        onChange={handleChange('password')}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">
                            {errors.password.message}
                        </div>
                    )}
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
