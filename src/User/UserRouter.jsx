import { Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';

import ShowTimeEntryPage from '../TimeEntries/ShowTimeEntryPage';
import TimeEntryListPage from '../TimeEntries/TimeEntryListPage';

const UserRouter = ({match}) => (
  <div>
    <h1>User {match.params.userId}</h1>
    <Switch>
      <Route
        exact
        path={`${match.path}/:id/show`} 
        render={() => <ShowTimeEntryPage userId={match.params.userId}/>} />
      <Route component={TimeEntryListPage} />
    </Switch>
  </div>
)

export default withRouter(UserRouter)
