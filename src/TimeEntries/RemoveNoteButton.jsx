import { Button, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React from 'react';

import ajax from '../Shared/ajax';

const RemoveNoteButton = ({reload, id, callback}) => (
  <Button
    negative
    floated='right'
    icon="remove"
    onClick={() => reload({}, 'delete', `/${id}`).then(() => callback())}/>
)

export default withRouter(ajax({
  url: ({timeEntryId}) => `/time_entries/${timeEntryId}/notes`,
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false,
  loadingComponent: <Loader active />
})(RemoveNoteButton))
