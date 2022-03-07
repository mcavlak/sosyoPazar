import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SuspenseFallback from './SuspenseFallback';

const index = lazy(() => import('../pages/app/index'));
const login = lazy(() => import('../pages/app/login'));
const register = lazy(() => import('../pages/app/register'));
const dashboard = lazy(() => import('../pages/app/dashboard'));
const store = lazy(() => import('../pages/app/store'));
const registerSeller = lazy(() => import('../pages/app/registerSeller'));


const Router = () => {

    return (
        <BrowserRouter>
            <Suspense fallback={<SuspenseFallback />}>
                <Switch>

                    <Route exact path="/" component={index} />
                    <Route exact path="/login" component={login} />
                    <Route exact path="/register" component={register} />
                    <Route exact path="/registerSeller" component={registerSeller} />
                    <PrivateRoute exact path="/dashboard" component={dashboard} />
                    <PrivateRoute exact path="/store" component={store} />

                </Switch>
            </Suspense>
        </BrowserRouter>
    )

}

export default Router