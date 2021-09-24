import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Spinner } from '../components/Spinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useAuth } from '../context/auth-context';

export default function Signin() {
    const { signin, reset, isError, isLoading, error } = useAuth();
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });
    const { email, password } = formFields;

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleChange = (name) => (event) => {
        reset();
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        reset();
        signin(formFields, () => history.replace(from));
    };

    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Signin</h2>

            <ErrorMessage show={isError}>{error}</ErrorMessage>

            {isLoading && <Spinner />}

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
