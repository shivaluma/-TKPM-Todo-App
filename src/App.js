import React from 'react';
import './assets/css/main.css';
import Layout from './components/Layout/Layout';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Tasks from './components/Tasks';
export const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/today' />
          </Route>
          <Route path='/' component={Tasks} />
        </Switch>
      </Layout>
    </Router>
  );
};
