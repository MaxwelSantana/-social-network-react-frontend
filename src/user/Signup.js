import React, { useState } from 'react';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';

export default function Signup() {
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { data, error, run, reset } = useAsync();

    const { name, email, password } = formFields;

    const handleChange = (name) => (event) => {
        reset();
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        run(
            client('signup', { data: formFields }).then(
                (dataObj) => dataObj.user,
                (errorObj) =>
                    Promise.reject(errorObj.error || errorObj.message),
            ),
        );
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>

            <div
                className="alert alert-danger"
                style={{ display: error ? '' : 'none' }}
            >
                {error}
            </div>
            <div
                className="alert alert-info"
                style={{ display: data ? '' : 'none' }}
            >
                User has successfully signed up, please Sign in!
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name" className="text-muted">
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
                    <label for="email" className="text-muted">
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
                    <label for="password" className="text-muted">
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
                <button className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    );
}
