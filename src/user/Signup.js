import React, { useState } from 'react';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../context/auth-context';
import { useAsync } from '../utils/hooks';

export default function Signup() {
    const [formFields, setFormFields] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { signup } = useAuth();
    const { error, isLoading, run, reset } = useAsync();

    const { name, email, password } = formFields;

    const handleChange = (name) => (event) => {
        reset();
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        run(signup(formFields));
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

            <Spinner show={isLoading} />

            <form onSubmit={handleSubmit}>
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
                <button className="btn btn-raised btn-primary">Submit</button>
            </form>
        </div>
    );
}
