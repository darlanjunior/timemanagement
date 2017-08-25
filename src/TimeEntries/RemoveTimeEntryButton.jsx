import { Button, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React from 'react';

import ajax from '../Shared/ajax';

const RemoveTimeEntryButton = ({reload, id, callback}) => (
  <Button
    negative
    fluid
    icon="remove"
    onClick={() => reload({}, 'delete', `/${id}`).then(callback)}/>
)

export default withRouter(ajax({
  url: '/time_entries',
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadOnMount: false,
  loadingComponent: <Loader active/>
})(RemoveTimeEntryButton))
