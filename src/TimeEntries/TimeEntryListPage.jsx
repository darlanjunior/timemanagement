import { Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../Shared/ajax';

const TimeEntryListPage = ({response}) => (
  <div>
    {response.time_entries.map(entry => <li>{entry}</li>)}
  </div>
)

export default ajax({
  url: '/time_entries',
  loadOnMount: true,
  loadingComponent: <Loader />
})(TimeEntryListPage)
