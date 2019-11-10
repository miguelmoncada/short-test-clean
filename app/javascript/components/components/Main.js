import React from 'react';
import { Switch , Route } from 'react-router-dom';
import LandingPage from './landingpage';
import NewUrl from './newurl';
import NotFound from './notfound';

const Main = () => (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/new-url" component={NewUrl} />
        <Route exact path="/not-found" component={NotFound} />
    </Switch>
);
export default Main;


