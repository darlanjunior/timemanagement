import { Button, Loader } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import React from 'react';

import CreateTimeEntryPage from './CreateTimeEntryPage';
import TimeEntryList from './TimeEntryList';
import ajax from '../Shared/ajax';

const TimeEntryListPage = ({match, response, reload}) => {
  const creationPage = () => <CreateTimeEntryPage refreshList={() => reload()}/>

  return <div>
    <Route
      exact
      path={`${match.url}/new`}
      render={creationPage} />
    <TimeEntryList timeEntries={response.data}/>
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
