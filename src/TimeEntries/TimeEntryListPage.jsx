import { Loader } from 'semantic-ui-react';
import React from 'react';

import TimeEntryList from './TimeEntryList';
import ajax from '../Shared/ajax';

const TimeEntryListPage = ({response}) => {
  return <div>
    <TimeEntryList timeEntries={response.data}/>
  </div>
}

export default ajax({
  url: '/time_entries',
  loadingComponent: <Loader />
})(TimeEntryListPage)
