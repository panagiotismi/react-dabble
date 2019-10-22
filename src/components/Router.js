import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const StorePicker = lazy(() => import('./StorePicker'));
const App = lazy(() => import('./App'));
const NotFound = lazy(() => import('./NotFound'));

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={StorePicker} />
        <Route path="/store/:storeName" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Router;
