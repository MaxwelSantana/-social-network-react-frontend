import React from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router';
import { useAuth } from './context/auth-context';
import Home from './core/Home';
import Navbar from './core/Navbar';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Users from './user/Users';

function PrivateRoute({ children, ...rest }) {
    const { user } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) => {
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
                <PrivateRoute exact path="/users">
                    <Users />
                </PrivateRoute>
                <PrivateRoute exact path="/user/:userId">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/user/edit/:userId">
                    <EditProfile />
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
