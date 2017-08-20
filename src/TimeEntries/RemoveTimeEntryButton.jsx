import { Button, Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../Shared/ajax';

const RemoveTimeEntryButton = ({reload, id, callback}) => (
  <Button
    fluid
    icon="remove"
    onClick={() => reload({}, 'delete', `/${id}`).then(callback)}/>
)

export default ajax({
  url: '/time_entries',
  loadOnMount: false,
  loadingComponent: <Loader />
})(RemoveTimeEntryButton)
