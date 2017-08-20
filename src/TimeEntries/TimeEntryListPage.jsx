import { Button, Loader } from 'semantic-ui-react';
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';

import CreateTimeEntryPage from './CreateTimeEntryPage';
import EditTimeEntryPage from './EditTimeEntryPage';
import TimeEntryList from './TimeEntryList';
import ajax from '../Shared/ajax';

const TimeEntryListPage = ({match, response: {data}, reload}) => {
  const creationPage = () => <CreateTimeEntryPage refreshList={() => reload()}/>
  const editingPage = () => <EditTimeEntryPage refreshList={() => reload()} timeEntries={data}/>

  return <div>
    <Switch>
      <Route
        exact
        path={`${match.url}/new`}
        render={creationPage} />
      <Route
        path={`${match.url}/:id`}
        render={editingPage}/>
    </Switch>

    <TimeEntryList timeEntries={data} {...{reload}}/>
    <Link to={`/time_entries/new`}>
      <Button
        icon="add"
        content="Create Time Entry"
        floated="right"/>
    </Link>
  </div>
}

export default ajax({
  url: '/time_entries',
  loadingComponent: <Loader />
})(TimeEntryListPage)
