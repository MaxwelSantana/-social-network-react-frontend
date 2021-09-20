import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './core/Home';
import Signup from './user/Signup';

export default function MainRouter() {
    return (
        <div>
            <Switch>
                <Route exact="true" path="/" component={Home} />
                <Route exact="true" path="/signup" component={Signup} />
            </Switch>
        </div>
    );
}
