import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Board from '../pages/Board';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Board} />
  </Switch>
);

export default Routes;
