import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SuspenseFallback from './SuspenseFallback';

const index = lazy(() => import('../pages/app/index'));
const login = lazy(() => import('../pages/app/login'));
const register = lazy(() => import('../pages/app/register'));
const dashboard = lazy(() => import('../pages/app/dashboard'));

const Router = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<SuspenseFallback />}>
                <Switch>

                    <Route exact path="/" component={index} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/register" component={register} />
                    <Route exact path="/dashboard" component={dashboard} />

                </Switch>
            </Suspense>
        </BrowserRouter>
    )

}

export default Router