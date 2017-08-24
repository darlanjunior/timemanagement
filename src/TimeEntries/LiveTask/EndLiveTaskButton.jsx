import { Button, Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../../Shared/ajax';

const EndLiveTaskButton = ({buttonProps, id, completeTask=false, reload}) => (
  <Button
    {...buttonProps}
    onClick={() => reload({completeTask}, 'delete', `/${id}`)}/>
)

export default ajax({
  url: '/live_tasks',
  loadOnMount: false,
  loadingComponent: <Loader active/>
})(EndLiveTaskButton)
