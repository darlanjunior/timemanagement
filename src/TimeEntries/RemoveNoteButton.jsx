import { Button, Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../Shared/ajax';

const RemoveNoteButton = ({reload, id, callback}) => (
  <Button 
    negative
    floated='right'
    icon="remove"
    onClick={() => reload({}, 'delete', `/${id}`).then(() => callback())}/>
)

export default ajax({
  url: ({timeEntryId}) => `/time_entries/${timeEntryId}/notes`,
  loadOnMount: false,
  loadingComponent: <Loader active />
})(RemoveNoteButton)
