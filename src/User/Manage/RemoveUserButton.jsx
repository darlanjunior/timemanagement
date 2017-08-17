import { Button, Loader } from 'semantic-ui-react';
import React from 'react';

import ajax from '../../Shared/ajax';

const RemoveUserButton = ({reload, id, callback}) => (
  <Button
    icon="remove user"
    onClick={() => reload({}, 'delete', `/${id}`).then(callback)}/>
)

export default ajax({
  url: '/users',
  loadOnMount: false,
  loadingComponent: <Loader />
})(RemoveUserButton)
