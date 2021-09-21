import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './core/Home';
import Navbar from './core/Navbar';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Profile from './user/Profile';
import { useAuth } from './context/auth-context';

export default function MainRouter() {
    const { user } = useAuth();
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    {user ? <Home /> : <Redirect to="/signin" />}
                </Route>
                <Route exact path="/signin">
                    {user ? <Redirect to="/" /> : <Signin />}
                </Route>
                <Route exact path="/signup">
                    {user ? <Redirect to="/" /> : <Signup />}
                </Route>
                <Route exact path="/user/:userId" component={Profile} />
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
