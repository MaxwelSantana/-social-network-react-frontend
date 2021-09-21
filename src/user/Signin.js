import React, { useState } from 'react';
import { useAsync } from '../utils/hooks';
import { signin } from '../services/auth-service';
import { Spinner } from '../components/Spinner';
import { Redirect } from 'react-router-dom';

export default function Signin() {
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const { data, error, isLoading, run, reset } = useAsync();

    const { email, password } = formFields;

    const handleChange = (name) => (event) => {
        reset();
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        reset();
        run(signin(formFields));
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signin</h2>

            <div
                className="alert alert-danger"
                style={{ display: error ? '' : 'none' }}
            >
                {error}
            </div>

            <Spinner show={isLoading} />

            {data && <Redirect to="/" />}

            <form onSubmit={handleSubmit}>
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
                <button className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    );
}
