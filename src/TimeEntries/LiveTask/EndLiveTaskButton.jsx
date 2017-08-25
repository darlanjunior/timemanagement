import { Button, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import React from 'react';

import ajax from '../../Shared/ajax';

const EndLiveTaskButton = ({
  buttonProps,
  id,
  completeTask=false,
  reload,
  refreshList
}) => (
  <Button
    {...buttonProps}
    onClick={() => reload({completeTask}, 'delete', `/${id}`).then(() => {
      return completeTask? refreshList() : null
    })}/>
)

export default withRouter(ajax({
  url: '/live_tasks',
  loadOnMount: false,
  params: ({match}) => !!match.params.userId? {user_id: match.params.userId} : {},
  loadingComponent: <Loader active/>
})(EndLiveTaskButton))
