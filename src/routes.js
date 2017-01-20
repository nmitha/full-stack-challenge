import React from 'react';
import { Router, Route } from 'react-router'

import {Home, NotFound} from './components/Home';
import EmployeesGrid from './components/EmployeesGrid';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Home} />
    <Route path="/employees" component={EmployeesGrid} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;