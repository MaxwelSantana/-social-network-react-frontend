import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Spinner from '../components/Spinner';
import { client } from '../utils/api-client';
import { useAsync } from '../utils/hooks';

export default function Signin() {
    const [formFields, setFormFields] = useState({
        email: '',
        password: '',
    });

    const { data, error, isLoading, run, reset } = useAsync();

    const { email, password } = formFields;

    useEffect(() => {
        if (!data) return;
        return <div>teste</div>;
    }, [data]);

    const handleChange = (name) => (event) => {
        reset();
        setFormFields((prev) => ({ ...prev, [name]: event.target.value }));
    };

    const authenticate = (data) => {
        if (!data) return;
        localStorage.setItem('user', JSON.stringify(data));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        run(
            client('signin', { data: formFields }).then(
                (dataObj) => {
                    authenticate(dataObj);
                    return dataObj;
                },
                (errorObj) =>
                    Promise.reject(errorObj.error || errorObj.message),
            ),
        );
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
