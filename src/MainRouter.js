import React from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';
import Home from './core/Home';
import Navbar from './core/Navbar';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Profile from './user/Profile';
import { useAuth } from './context/auth-context';

function PrivateRoute({ children, ...rest }) {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
                console.log({ location });
                return user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: location },
                        }}
                    />
                );
            }}
        />
    );
}
export default function MainRouter() {
    const { user } = useAuth();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/signin">
                    {user ? <Redirect to={from} /> : <Signin />}
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/user/:userId">
                    <Profile />
                </PrivateRoute>
            </Switch>
        </div>
    );
}
/*
<Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>*/
